"""Private aggregate report. Run outside the web server, never publish its output."""
import argparse
import datetime as dt
import json
import os
import sqlite3
from pathlib import Path
from zoneinfo import ZoneInfo

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--db',required=True,type=Path)
    parser.add_argument('--output',required=True,type=Path)
    args=parser.parse_args()
    os.umask(0o077)
    today=dt.datetime.now(ZoneInfo('Europe/Madrid')).date()
    report={'generated_at':dt.datetime.now(dt.timezone.utc).isoformat(),'unit':'events; not unique people, sessions or completed applications','status':'no_data','records':[]}
    if args.db.exists():
        with sqlite3.connect(args.db) as db:
            db.execute('DELETE FROM daily_counts WHERE day < ?',((today-dt.timedelta(days=179)).isoformat(),))
            db.row_factory=sqlite3.Row
            report['records']=[dict(row) for row in db.execute('SELECT day,path,event,count FROM daily_counts ORDER BY day,path,event')]
            report['status']='ok'
    args.output.parent.mkdir(parents=True,exist_ok=True)
    temporary=args.output.with_suffix('.tmp')
    temporary.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    temporary.replace(args.output)
    print(json.dumps({'status':report['status'],'rows':len(report['records'])}))
if __name__=='__main__':main()
