import unittest
from datetime import date,timedelta
from weekly_review import summarize_window,publication_review

class ReviewTests(unittest.TestCase):
 def test_missing_days_never_become_zero_or_a_change(self):
  rows={'2026-09-07':{'impressions':7,'clicks':1}}
  baseline=summarize_window(rows,date(2026,9,7),date(2026,9,13))
  self.assertFalse(baseline['complete']);self.assertIsNone(baseline['daily_impressions'])
  self.assertTrue(all(m['daily_impressions_change'] is None for m in publication_review(rows,baseline)['milestones']))
 def test_windows_exclude_publication_day_and_compare_daily_rates(self):
  rows={str(date(2026,9,7)+timedelta(days=i)):{'impressions':14,'clicks':7} for i in range(7)}
  baseline=summarize_window(rows,date(2026,9,7),date(2026,9,13))
  rows.update({str(date(2026,9,15)+timedelta(days=i)):{'impressions':28,'clicks':14} for i in range(28)})
  rows['2026-09-14']={'impressions':999999,'clicks':999999}
  milestones=publication_review(rows,baseline)['milestones']
  self.assertEqual([m['window']['days'] for m in milestones],[7,14,28])
  self.assertTrue(all(m['daily_impressions_change']==14 and m['daily_clicks_change']==7 for m in milestones))

if __name__=='__main__':unittest.main()
