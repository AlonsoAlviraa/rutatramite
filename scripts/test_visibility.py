import unittest
from datetime import date
from audit_visibility import LinkDocument, local_path, summarize
from seo_workflow import measurement_limits


class VisibilityEvidenceTests(unittest.TestCase):
    def test_navigation_and_main_links_are_distinguished_without_script_text(self):
        p = LinkDocument()
        p.feed('<nav><a href="/nav">Menú</a></nav><main><a href="/guide"><b>Guía</b></a><script>hidden</script><p>Texto</p></main>')
        self.assertEqual([(a['text'], a['main']) for a in p.anchors], [('Menú', False), ('Guía', True)])
        self.assertNotIn('hidden', ''.join(p.main_text))

    def test_noindex_bridge_is_reachable_but_not_indexable_path(self):
        def page(links, noindex=False):
            return {'status': 200, 'html': True, 'noindex': noindex, 'internal_links': links, 'main_internal_links': links}
        pages = {'/': page(['/bridge']), '/bridge': page(['/leaf'], True), '/leaf': page(['/leaf'])}
        result = summarize(pages, ['/', '/leaf'])
        self.assertEqual(result['unreachable_sitemap_pages'], [])
        self.assertEqual(result['sitemap_pages_without_indexable_path'], ['/leaf'])
        self.assertEqual(result['pages'][1]['incoming_pages'], ['/bridge'])
        self.assertEqual(result['pages'][1]['indexable_incoming_count'], 0)

    def test_failed_download_does_not_generate_links_or_prove_coverage(self):
        result = summarize({'/': {'status': 503, 'html': True, 'internal_links': ['/leaf']}}, ['/', '/leaf'])
        self.assertEqual(result['html_pages'], 0)
        self.assertIn('/leaf', result['unreachable_sitemap_pages'])
        self.assertIn('/', result['unreachable_sitemap_pages'])
        self.assertEqual(result['fetch_issues'][0]['status'], 503)

    def test_query_identity_and_external_links(self):
        self.assertEqual(local_path('https://rutatramite.com/a', '/search?q=dni#answer'), '/search?q=dni')
        self.assertIsNone(local_path('https://rutatramite.com/', 'https://example.com/a'))

    def test_window_limit_does_not_claim_future_rows_predate_release(self):
        self.assertIn('predate', measurement_limits(date(2026, 9, 13))[-1])
        self.assertNotIn('predate', measurement_limits(date(2026, 9, 16))[-1])
        self.assertIn('overlaps', measurement_limits(date(2026, 9, 16))[-1])


if __name__ == '__main__': unittest.main()
