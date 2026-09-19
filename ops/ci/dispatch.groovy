import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import hudson.model.ParametersAction
import hudson.model.StringParameterValue
import hudson.model.Queue
import jenkins.model.Jenkins

def p = new JsonSlurper().parseText(new String('__PAYLOAD__'.decodeBase64(), 'UTF-8'))
assert p.repository in ['rutatramite', 'visionsetil']
assert p.sha ==~ /[a-f0-9]{40}/
assert p.base == '' || p.base ==~ /[a-f0-9]{40}/
assert p.identity ==~ /[a-f0-9]{64}/
assert p.sequence instanceof Number && p.sequence > 0
assert p.scope ==~ /(?:pr\/[1-9][0-9]*|branch\/[A-Za-z0-9_\/.\-]+|legacy\/[a-f0-9]{64})/
def j = Jenkins.get()
def job = j.getItem(p.repository + '-pr')
assert job != null
def parameters = { item ->
    item.getAction(ParametersAction)?.parameters?.collectEntries { [(it.name): it.value] } ?: [:]
}
def matches = { item ->
    def values = parameters(item)
    values.EVENT_ID == p.identity || (!values.EVENT_ID && values.SOURCE == 'github' && values.SHA == p.sha && (values.BASE_SHA ?: '') == p.base)
}
def receipt
def obsoleteRuns = []
// Queue movement and dispatch are inspected under the same controller lock.
Queue.withLock({
    def queued = (j.queue.items.toList() + j.queue.leftItems.toList()).find { it.task == job && matches(it) }
    def built = job.builds.find { matches(it) }
    def newer = (j.queue.items.findAll { it.task == job }.toList() + job.builds.toList()).find {
        def values = parameters(it)
        values.CI_SCOPE == p.scope && (values.CI_SEQUENCE ?: '0').toLong() > p.sequence
    }
    if (newer != null) {
        receipt = [status: 'superseded']
    } else if (queued != null || built != null) {
        receipt = [status: 'existing', queue_id: queued?.id, build: built?.number]
    } else if (p.recover_only) {
        receipt = [status: 'unresolved', reason: 'No surviving controller evidence for legacy intent']
    } else {
        def actions = new ParametersAction([
            new StringParameterValue('SHA', p.sha),
            new StringParameterValue('BASE_SHA', p.base),
            new StringParameterValue('SOURCE', 'github'),
            new StringParameterValue('EVENT_ID', p.identity),
            new StringParameterValue('CI_SEQUENCE', p.sequence.toString()),
            new StringParameterValue('CI_SCOPE', p.scope)
        ])
        def scheduled = j.queue.schedule2(job, 0, actions)
        assert !scheduled.refused && scheduled.item != null : 'Jenkins refused the build'
        def cancelled = []
        // Only automatic checks of this proposal/branch are superseded.
        j.queue.items.findAll { it.task == job && it.id != scheduled.item.id && parameters(it).CI_SCOPE == p.scope }.each {
            if (j.queue.cancel(it)) cancelled.add(it.id)
        }
        receipt = [status: 'queued', queue_id: scheduled.item.id, cancelled_queue_ids: cancelled]
        obsoleteRuns = job.builds.findAll { it.building && parameters(it).CI_SCOPE == p.scope && !matches(it) }
    }
} as Runnable)
// Pipeline jobs may already be waiting for their agent rather than in the job queue.
// Stopping them outside the queue lock avoids deadlocking executor cleanup.
if (receipt.status == 'queued') {
    def stopped = []
    obsoleteRuns.each {
        it.doStop()
        stopped.add(it.number)
    }
    receipt.stopped_builds = stopped
}
println(JsonOutput.toJson(receipt))
