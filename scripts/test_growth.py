import json,unittest
from datetime import date,datetime,timedelta,timezone
from pathlib import Path
from tempfile import TemporaryDirectory
from measure_growth import evaluate,save_report

class GoalEvidenceTests(unittest.TestCase):
    def rows(self):
        return [{'keys':[str(date(2026,9,11)-timedelta(days=i))],'impressions':1000,'clicks':50} for i in range(7)]
    def test_requires_both_daily_targets(self):
        rows=self.rows(); rows[0]['clicks']=49
        self.assertFalse(evaluate(rows,date(2026,9,11))['goal_evidenced'])
    def test_missing_day_is_unknown(self):
        r=evaluate(self.rows()[1:],date(2026,9,11))
        self.assertFalse(r['goal_evidenced']); self.assertEqual(r['missing_days'],['2026-09-11'])
        self.assertIsNone(r['daily'][-1]['clicks'])
    def test_spike_does_not_replace_daily_results(self):
        self.assertFalse(evaluate([{'keys':['2026-09-11'],'impressions':7000,'clicks':350}],date(2026,9,11))['goal_evidenced'])
    def test_full_week_proves_sustained_target(self):
        self.assertTrue(evaluate(self.rows(),date(2026,9,11))['goal_evidenced'])

    def test_failed_attempt_preserves_last_success_and_reports_failure(self):
        with TemporaryDirectory() as folder:
            directory=Path(folder)
            now=datetime(2026,9,14,tzinfo=timezone.utc)
            success={'checked_at':now.isoformat(),'evaluation':{'goal_evidenced':False}}
            save_report(success,directory,now)
            failure={'error':'URLError','evaluation':{'goal_evidenced':False,'reason':'measurement unavailable'}}
            save_report(failure,directory,now+timedelta(minutes=1))
            self.assertEqual(json.loads((directory/'growth-latest.json').read_text()),failure)
            self.assertEqual(json.loads((directory/'growth-last-success.json').read_text()),success)
            self.assertEqual(len(list(directory.glob('growth-2026*.json'))),2)

    def test_first_failure_does_not_invent_success(self):
        with TemporaryDirectory() as folder:
            directory=Path(folder)
            save_report({'error':'URLError'},directory,datetime.now(timezone.utc))
            self.assertFalse((directory/'growth-last-success.json').exists())

if __name__=='__main__':unittest.main()
