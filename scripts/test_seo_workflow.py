import unittest
from unittest.mock import patch
from review_freecrawl import check_coverage, conflicting_ids

class EvidenceTests(unittest.TestCase):
    def test_unfetched_discoveries_do_not_inflate_coverage(self):
        result=check_coverage(['https://example.com/a'],[{'url':'https://example.com/a','statusCode':200,'indexability':'indexable','contentKind':'html'},{'url':'https://external.example/','statusCode':None,'indexability':'indexable'}])
        self.assertTrue(result['passed']);self.assertEqual(result['discovered_but_unfetched'],1)
    def test_missing_seed_and_noindex_fail_even_with_success_exit(self):
        result=check_coverage(['a','b'],[{'url':'a','statusCode':200,'indexability':'non-indexable','contentKind':'html'}])
        self.assertFalse(result['passed']);self.assertEqual(result['missing_urls'],['b']);self.assertEqual(result['failed_urls'],['a'])
    def test_entity_reference_is_not_conflicting_definition(self):
        self.assertEqual(conflicting_ids([{'@id':'#org','@type':'Organization','name':'Ruta'},{'@id':'#org'},{'@id':'#org','name':'Ruta'}]),[])
    def test_conflicting_entity_names_are_reported(self):
        self.assertEqual(conflicting_ids([{'@id':'#org','name':'Ruta'},{'@id':'#org','name':'Different'}]),[{'id':'#org','property':'name'}])

    def test_gsc_adapter_uses_final_window_and_single_property(self):
        from seo_workflow import FinalizedGSC, SITE
        import json
        service=FinalizedGSC('test-only','2026-06-15','2026-09-12')
        with patch('seo_workflow.http_json',return_value=(200,json.dumps({'rows':[]}))) as request:
            service.query(siteUrl=SITE,body={'startDate':'2000-01-01','endDate':'2099-01-01','dataState':'all','dimensions':['page']}).execute()
        payload=request.call_args.args[1]
        self.assertEqual((payload['startDate'],payload['endDate'],payload['dataState']),('2026-06-15','2026-09-12','final'))
        self.assertEqual(payload['aggregationType'],'byPage')
        self.assertNotIn('test-only',json.dumps(service.evidence))
        with self.assertRaises(ValueError): service.query(siteUrl='sc-domain:other.example',body={})

    def test_gsc_failure_does_not_become_empty_success(self):
        from seo_workflow import FinalizedGSC
        service=FinalizedGSC('test-only','2026-06-15','2026-09-12')
        with patch('seo_workflow.http_json',return_value=(403,'sensitive response not serialized')):
            with self.assertRaisesRegex(RuntimeError,'GSC HTTP 403'): service.fetch({'dimensions':['query']})
        self.assertEqual(service.evidence,[])

if __name__=='__main__':unittest.main()
