import json
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

from cleanup_runs import cleanup


class RetentionTests(unittest.TestCase):
    def test_only_old_completed_run_is_removed(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            now = datetime(2026,9,14,tzinfo=timezone.utc)
            fixtures = [('20260801T010000Z','passed','2026-08-01T01:00:00+00:00'),
                        ('20260802T010000Z','running',None),
                        ('20260914T010000Z','failed','2026-09-14T01:00:00+00:00')]
            for stamp, status, finished in fixtures:
                target = root/('rutatramite-'+'a'*12+'-'+stamp)/'results'
                target.mkdir(parents=True)
                (target/'result.json').write_text(json.dumps({'status':status,'finished_at':finished}))
            unrelated = root/'archive'
            unrelated.mkdir()
            self.assertEqual(cleanup(root,now),['rutatramite-'+'a'*12+'-20260801T010000Z'])
            self.assertEqual(len(list(root.iterdir())),3)
            self.assertTrue(unrelated.exists())


if __name__ == '__main__':
    unittest.main()
