import jenkins.model.Jenkins
import hudson.security.HudsonPrivateSecurityRealm
import hudson.security.FullControlOnceLoggedInAuthorizationStrategy
import jenkins.model.JenkinsLocationConfiguration

def j = Jenkins.get()
if (!(j.securityRealm instanceof HudsonPrivateSecurityRealm)) {
  def realm = new HudsonPrivateSecurityRealm(false)
  realm.createAccount('mariano', new File('/run/secrets/admin-password').text.trim())
  j.setSecurityRealm(realm)
}
def auth = new FullControlOnceLoggedInAuthorizationStrategy()
auth.setAllowAnonymousRead(false)
j.setAuthorizationStrategy(auth)
j.setNumExecutors(0)
j.setSlaveAgentPort(-1)
JenkinsLocationConfiguration.get().setUrl('https://ci.rutatramite.com/')
j.save()
