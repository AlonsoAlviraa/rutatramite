import json
def span(s, path, opener='{\n"id": "'):
    i = s.find(f'"path": "{path}"'); assert i > 0, path
    a = s.rfind(opener, 0, i); d = 0; j = a; ins = False; esc = False
    while True:
        c = s[j]
        if ins:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == '"': ins = False
        else:
            if c == '"': ins = True
            elif c == "{": d += 1
            elif c == "}":
                d -= 1
                if d == 0: break
        j += 1
    return a, j + 1
