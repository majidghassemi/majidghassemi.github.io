#!/usr/bin/env python3
"""
parse_cv.py
Parses a longtable-based LaTeX CV and writes an alfolio-compatible _data/cv.yml.

Handles:
  - \color{}-coded section headers (both crimson and blue)
  - \nohyphens{\color{}{}} wrappers
  - Split section titles ("Honors and" / "scholarships" across two rows)
  - Commented-out blocks (fully stripped before parsing)
  - \hfill for left/right splitting within cells
  - \& as escaped ampersand (not a column separator)

Usage:
    python parse_cv.py <input.tex> <output.yml>
"""

import re
import sys
import yaml
from pathlib import Path


# ═══════════════════════════════════════════════════════════════════════════════
# 1. LaTeX → plain-text helpers
# ═══════════════════════════════════════════════════════════════════════════════

HFILL = '\x00'  # internal sentinel for \hfill positions


def clean(s: str) -> str:
    """Strip LaTeX markup; replace \\hfill with HFILL sentinel for later splitting."""
    # \href{url}{text} → text
    s = re.sub(r'\\href\{[^}]*\}\{([^}]*)\}', r'\1', s)
    # {\it text} → text
    s = re.sub(r'\{\\it\s+([^}]*)\}', r'\1', s)
    # Named one-argument commands
    for cmd in ('textbf', 'textit', 'emph', 'texttt', 'nohyphens',
                'underline', 'footnotesize', 'Huge', 'noindent'):
        s = re.sub(rf'\\{cmd}\{{([^}}]*)\}}', r'\1', s)
    # \color{X}{text} → text
    s = re.sub(r'\\color\{[^}]+\}\{([^}]+)\}', r'\1', s)
    # \hfill → sentinel
    s = re.sub(r'\\hfill\b', HFILL, s)
    # Remove remaining LaTeX commands (no-arg or with args)
    s = re.sub(r'\\[a-zA-Z]+(?:\*)?(?:\[[^\]]*\])*(?:\{[^}]*\})*', '', s)
    # Remove leftover braces
    s = re.sub(r'[{}]', '', s)
    # Unescape & and normalise dashes
    s = s.replace('\\&', '&').replace('---', '—').replace('--', '–')
    # Collapse whitespace
    s = re.sub(r'[ \t]+', ' ', s).strip()
    return s


def split_hfill(s: str) -> tuple[str, str]:
    """Split a cleaned string on the HFILL sentinel → (left, right). right='' if absent."""
    if HFILL in s:
        l, r = s.split(HFILL, 1)
        return l.strip(), r.strip()
    return s.strip(), ''


# ═══════════════════════════════════════════════════════════════════════════════
# 2. Longtable row extraction
# ═══════════════════════════════════════════════════════════════════════════════

def get_rows(tex: str) -> list[tuple[str, str]]:
    """
    Extract (left_col_raw, right_col_raw) pairs from the longtable body.
    Rows are delimited by \\ (double backslash).
    LaTeX comments are stripped first so commented-out entries are ignored.
    """
    m = re.search(
        r'\\begin\{longtable\}[^\n]*\n(.*?)\\end\{longtable\}',
        tex, re.DOTALL
    )
    if not m:
        sys.exit('ERROR: \\begin{longtable} … \\end{longtable} not found in .tex file.')

    body = re.sub(r'%[^\n]*', '', m.group(1))  # strip all % comments

    rows: list[tuple[str, str]] = []
    for chunk in re.split(r'\\\\\n?', body):
        chunk = chunk.strip()
        if not chunk:
            rows.append(('', ''))
            continue
        # Skip \begin{} / \end{} environment markers inside the longtable
        if re.match(r'\\(?:begin|end)\{', chunk):
            continue
        # Split on first unescaped & (column separator; \& is NOT a separator)
        parts = re.split(r'(?<!\\)&', chunk, maxsplit=1)
        if len(parts) == 2:
            rows.append((parts[0].strip(), parts[1].strip()))
        else:
            rows.append((chunk, ''))

    return rows


# ═══════════════════════════════════════════════════════════════════════════════
# 3. Section grouping
# ═══════════════════════════════════════════════════════════════════════════════

def _section_name(left: str) -> str | None:
    """Return cleaned section label if left col contains a \\color{} header; else None."""
    m = re.search(r'\\color\{[^}]+\}\{([^}]+)\}', left)
    return clean(m.group(1)).strip() if m else None


def group_sections(rows: list[tuple[str, str]]) -> list[tuple[str, list[str]]]:
    """
    Walk rows, accumulate right-col strings under each section name.
    Automatically merges the split "Honors and" / "scholarships" title.
    Returns [(section_name, [right_col_lines]), …] in document order.
    """
    result: list[list] = []   # [[name, [lines]], …]
    cur: list | None = None

    for left, right in rows:
        name = _section_name(left)
        if name:
            if cur and cur[0].lower() == 'honors and':
                # Second half of the split title row
                cur[0] = 'Honors and scholarships'
                if right:
                    cur[1].append(right)
            else:
                cur = [name, []]
                result.append(cur)
                if right:
                    cur[1].append(right)
        else:
            if cur is not None:
                cur[1].append(right)   # '' marks an entry boundary

    return [(s[0], s[1]) for s in result]


# ═══════════════════════════════════════════════════════════════════════════════
# 4. Entry splitting helper
# ═══════════════════════════════════════════════════════════════════════════════

def split_entries(lines: list[str]) -> list[list[str]]:
    """Split a flat list of right-col strings into individual entries at blank lines."""
    entries: list[list[str]] = []
    current: list[str] = []
    for line in lines:
        if line == '':
            if current:
                entries.append(current)
                current = []
        else:
            current.append(line)
    if current:
        entries.append(current)
    return entries


# ═══════════════════════════════════════════════════════════════════════════════
# 5. Section-specific parsers
# ═══════════════════════════════════════════════════════════════════════════════

def parse_education(lines: list[str]) -> list[dict]:
    """
    Per entry:
      line 0 → Institution \\hfill Location
      line 1 → Degree/Programme \\hfill Date range
      line 2+ → Supervision / thesis / GPA notes (→ description bullets)
    """
    result = []
    for entry in split_entries(lines):
        item: dict = {}
        for i, raw in enumerate(entry):
            cl = clean(raw)
            main, extra = split_hfill(cl)
            if i == 0:
                item['institution'] = f'{main}, {extra}' if extra else main
            elif i == 1:
                item['title'] = main
                if extra:
                    item['year'] = extra
            else:
                if cl:
                    item.setdefault('description', []).append(cl)
        if item:
            result.append(item)
    return result


def parse_research_exp(lines: list[str]) -> list[dict]:
    """
    Per entry:
      line 0 → Lab name
      line 1 → Supervisor … \\hfill Date range
      line 2+ → Research description bullets
    """
    result = []
    for entry in split_entries(lines):
        item: dict = {}
        for i, raw in enumerate(entry):
            cl = clean(raw)
            main, extra = split_hfill(cl)
            if i == 0:
                item['title'] = main
            elif i == 1:
                item['institution'] = main
                if extra:
                    item['year'] = extra
            else:
                if cl:
                    item.setdefault('description', []).append(cl)
        if item:
            result.append(item)
    return result


def parse_industry_exp(lines: list[str]) -> list[dict]:
    """
    Per entry:
      line 0 → Company, Department \\hfill Location  (location dropped)
      line 1 → Job title \\hfill Date range
      line 2+ → Description bullets
    """
    result = []
    for entry in split_entries(lines):
        item: dict = {}
        for i, raw in enumerate(entry):
            cl = clean(raw)
            main, extra = split_hfill(cl)
            if i == 0:
                item['institution'] = main      # location (extra) intentionally dropped
            elif i == 1:
                item['title'] = main
                if extra:
                    item['year'] = extra
            else:
                if cl:
                    item.setdefault('description', []).append(cl)
        if item:
            result.append(item)
    return result


def parse_teaching_exp(lines: list[str]) -> list[dict]:
    """
    Per entry:
      line 0 → Role, Institutions \\hfill Date range
      line 1+ → Course list / description bullets
    """
    result = []
    for entry in split_entries(lines):
        item: dict = {}
        for i, raw in enumerate(entry):
            cl = clean(raw)
            main, extra = split_hfill(cl)
            if i == 0:
                item['title'] = main
                if extra:
                    item['year'] = extra
            else:
                if cl:
                    item.setdefault('description', []).append(cl)
        if item:
            result.append(item)
    return result


def parse_publications(lines: list[str]) -> list[str]:
    """
    Per entry (3 lines): Title / Authors / Venue
    → "Title. Authors. Venue."
    """
    result = []
    for entry in split_entries(lines):
        parts = [clean(l) for l in entry if l]
        if parts:
            pub = '. '.join(p.rstrip('.') for p in parts) + '.'
            result.append(pub)
    return result


def parse_awards(lines: list[str]) -> list[str]:
    """Each line: Award name \\hfill Year → 'Award name, Year'"""
    result = []
    for raw in lines:
        if not raw:
            continue
        main, year = split_hfill(clean(raw))
        if main:
            result.append(f'{main}, {year}' if year else main)
    return result


def parse_service(lines: list[str]) -> list[str]:
    """Drop the legend line; return all other service items as plain strings."""
    result = []
    for raw in lines:
        if not raw:
            continue
        cl = clean(raw)
        if 'Stands for Reviewer' in cl:
            continue
        if cl:
            result.append(cl)
    return result


def parse_grants(lines: list[str]) -> list[dict]:
    """
    Per entry:
      line 0 → Institution \\hfill Date range
      line 1+ → Grant description bullets
    """
    result = []
    for entry in split_entries(lines):
        item: dict = {}
        for i, raw in enumerate(entry):
            cl = clean(raw)
            main, extra = split_hfill(cl)
            if i == 0:
                item['title'] = main
                if extra:
                    item['year'] = extra
            else:
                if cl:
                    item.setdefault('description', []).append(cl)
        if item:
            result.append(item)
    return result


# ═══════════════════════════════════════════════════════════════════════════════
# 6. YAML assembly
# ═══════════════════════════════════════════════════════════════════════════════

# section label (lower-case) → (yaml display title, alfolio type, parser function)
SECTIONS: dict[str, tuple[str, str, callable]] = {
    'education':               ('Education',           'time_table', parse_education),
    'research experience':     ('Research Experience', 'time_table', parse_research_exp),
    'industry experience':     ('Industry Experience', 'time_table', parse_industry_exp),
    'teaching experience':     ('Teaching Experience', 'time_table', parse_teaching_exp),
    'publications':            ('Publications',        'list',       parse_publications),
    'honors and scholarships': ('Honors & Awards',     'list',       parse_awards),
    'service to the community':('Service',             'list',       parse_service),
    'grants':                  ('Grants',              'time_table', parse_grants),
}


def build_cv_yaml(sections: list[tuple[str, list[str]]]) -> list[dict]:
    output = []
    for name, lines in sections:
        key = name.lower()
        if key not in SECTIONS:
            # Unknown section — skip silently (e.g. "Research interests")
            continue
        display_title, sec_type, parser = SECTIONS[key]
        contents = parser(lines)
        if contents:
            output.append({
                'title':    display_title,
                'type':     sec_type,
                'contents': contents,
            })
    return output


# ═══════════════════════════════════════════════════════════════════════════════
# 7. Entry point
# ═══════════════════════════════════════════════════════════════════════════════

def main() -> None:
    if len(sys.argv) != 3:
        print('Usage: parse_cv.py <input.tex> <output.yml>')
        sys.exit(1)

    tex_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])

    if not tex_path.exists():
        sys.exit(f'ERROR: {tex_path} not found.')

    tex  = tex_path.read_text(encoding='utf-8')
    rows = get_rows(tex)
    secs = group_sections(rows)
    data = build_cv_yaml(secs)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, sort_keys=False,
                  default_flow_style=False)

    print(f'✓  Wrote {len(data)} sections → {out_path}')
    for sec in data:
        n = len(sec['contents'])
        print(f'   {sec["title"]}: {n} {"entries" if n != 1 else "entry"}')


if __name__ == '__main__':
    main()