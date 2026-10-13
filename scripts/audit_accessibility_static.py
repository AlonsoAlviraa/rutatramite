"""Check accessible-name prerequisites in representative production HTML.

This does not assess computed visibility, contrast, keyboard behavior or WCAG conformance.
"""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SAMPLES = ['index', 'dni', 'dni/cita-previa', 'empadronarse',
           'empadronarse/comunidad-de-madrid/madrid/madrid', 'becas/muface', 'contacto']

class Controls(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.labels = set()
        self.inputs = []
        self.buttons = []
        self.current_button = None
        self.current_label = None
        self.issues = []
        self.main_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            if attrs['id'] in self.ids:
                self.issues.append(f"Duplicate id: {attrs['id']}")
            self.ids.add(attrs['id'])
        if tag == 'main': self.main_count += 1
        if tag == 'label':
            self.current_label = {'text':''}
            if attrs.get('for'): self.labels.add(attrs['for'])
        if tag in ('input', 'select', 'textarea') and attrs.get('type') not in ('hidden', 'submit', 'button'):
            attrs['_label'] = self.current_label
            self.inputs.append(attrs)
        if tag == 'img' and 'alt' not in attrs: self.issues.append('Image without alt attribute')
        if tag == 'button':
            self.current_button = {'attrs':attrs, 'text':''}
            self.buttons.append(self.current_button)

    def handle_data(self, data):
        if self.current_button is not None: self.current_button['text'] += data
        if self.current_label is not None: self.current_label['text'] += data

    def handle_endtag(self, tag):
        if tag == 'button': self.current_button = None
        if tag == 'label': self.current_label = None

    def finish(self):
        if self.main_count != 1: self.issues.append(f'{self.main_count} main landmarks')
        for attrs in self.inputs:
            implicit = attrs.get('_label')
            if not (attrs.get('aria-label') or attrs.get('aria-labelledby') or attrs.get('id') in self.labels or (implicit and implicit['text'].strip())):
                self.issues.append(f"Control without explicit label: {attrs.get('id', attrs.get('name','unnamed'))}")
        for button in self.buttons:
            attrs = button['attrs']
            if not (button['text'].strip() or attrs.get('aria-label') or attrs.get('aria-labelledby')):
                self.issues.append('Button without text or ARIA name')
        return self.issues

pages=[]
for sample in SAMPLES:
    html=(ROOT/'.next/server/app'/f'{sample}.html').read_text(encoding='utf-8')
    html=re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html)
    parser=Controls()
    parser.feed(html)
    pages.append({'path':'/' if sample=='index' else '/'+sample, 'issues':parser.finish(),
                  'controls':len(parser.inputs), 'buttons':len(parser.buttons)})
report={'build_id':(ROOT/'.next/BUILD_ID').read_text().strip(),
        'scope':'Static HTML prerequisites only; not a complete accessibility audit', 'pages':pages}
(ROOT/'docs/audit-accessibility-static.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report))
