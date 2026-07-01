#!/usr/bin/env python3
"""Generate three color scheme variants of index.html for comparison."""

import re, os

SRC = os.path.join(os.path.dirname(__file__), "index.html")

SCHEMES = {
    "blue": {
        "name": "科技蓝",
        "sand":   "#F5F7FA",
        "sand2":  "#EDF0F5",
        "sand3":  "#D8DEE6",
        "ink":    "#1A1F36",
        "ink2":   "#3A3F52",
        "ink3":   "#6B7280",
        "accent": "#2563EB",
        "accent2":"#3B82F6",
        "accent3":"#DBEAFE",
        "rule":   "#CBD5E1",
        "shadow": "26,31,54",
        "chat_accent":       "#2563EB",
        "chat_accent_light": "#3B82F6",
        "chat_sand":  "#F0F4FF",
        "chat_sand2": "#E0E7FF",
        "chat_sand3": "#CBD5E1",
        "chat_green": "#00C896",
        "bubble_grad": "linear-gradient(135deg,#3B82F6,#2563EB,#1D4ED8)",
        "bubble_border": "#60A5FA",
    },
    "teal": {
        "name": "青绿",
        "sand":   "#F0FDF9",
        "sand2":  "#E0F5ED",
        "sand3":  "#C8E8DA",
        "ink":    "#1A2E2B",
        "ink2":   "#3A4D4A",
        "ink3":   "#6B7D7A",
        "accent": "#0D9488",
        "accent2":"#14B8A6",
        "accent3":"#CCFBF1",
        "rule":   "#B8DDD2",
        "shadow": "26,46,43",
        "chat_accent":       "#0D9488",
        "chat_accent_light": "#14B8A6",
        "chat_sand":  "#F0FDF9",
        "chat_sand2": "#E0F5ED",
        "chat_sand3": "#C8E8DA",
        "chat_green": "#00C896",
        "bubble_grad": "linear-gradient(135deg,#14B8A6,#0D9488,#0F766E)",
        "bubble_border": "#5EEAD4",
    },
    "indigo": {
        "name": "靛紫",
        "sand":   "#F5F3FF",
        "sand2":  "#EDE9FE",
        "sand3":  "#DDD6FE",
        "ink":    "#1E1A2E",
        "ink2":   "#3D3755",
        "ink3":   "#6B638A",
        "accent": "#7C3AED",
        "accent2":"#8B5CF6",
        "accent3":"#EDE9FE",
        "rule":   "#C4B5FD",
        "shadow": "30,26,46",
        "chat_accent":       "#7C3AED",
        "chat_accent_light": "#8B5CF6",
        "chat_sand":  "#F5F3FF",
        "chat_sand2": "#EDE9FE",
        "chat_sand3": "#DDD6FE",
        "chat_green": "#00C896",
        "bubble_grad": "linear-gradient(135deg,#8B5CF6,#7C3AED,#6D28D9)",
        "bubble_border": "#A78BFA",
    },
}

with open(SRC, "r") as f:
    src_html = f.read()

for key, s in SCHEMES.items():
    html = src_html

    # --- :root CSS variables ---
    html = html.replace("--sand:#f7f3ec;--sand2:#ede7db;--sand3:#e0d7c8;",
                        f"--sand:{s['sand']};--sand2:{s['sand2']};--sand3:{s['sand3']};")
    html = html.replace("--ink:#1e1c18;--ink2:#3d3a33;--ink3:#6b6659;",
                        f"--ink:{s['ink']};--ink2:{s['ink2']};--ink3:{s['ink3']};")
    html = html.replace("--copper:#a0673a;--copper2:#c8824a;",
                        f"--copper:{s['accent']};--copper2:{s['accent2']};")
    html = html.replace("--rule:1px solid #d8d0c0;",
                        f"--rule:1px solid {s['rule']};")

    # --- hardcoded border colors ---
    html = html.replace("1px solid #d8d0c0", f"1px solid {s['rule']}")
    html = html.replace("#d8d0c0", s['rule'])
    html = html.replace("#e8e0d0", s['rule'])

    # --- shadow rgba(30,28,24,...) ---
    html = html.replace("rgba(30,28,24,", f"rgba({s['shadow']},")

    # --- btn-primary: black bg -> accent bg ---
    html = html.replace(
        ".btn-primary{background:var(--ink);color:var(--sand)",
        f".btn-primary{{background:{s['accent']};color:#fff"
    )
    html = html.replace(
        ".cta-submit{background:var(--ink);color:var(--sand)",
        f".cta-submit{{background:{s['accent']};color:#fff"
    )

    # --- chat bubble: root variables ---
    html = html.replace(
        "--chat-copper:#a0673a;--chat-copper-light:#c4844d;",
        f"--chat-copper:{s['chat_accent']};--chat-copper-light:{s['chat_accent_light']};"
    )
    html = html.replace(
        "--chat-sand:#f8f5f0;--chat-sand2:#ece7df;--chat-sand3:#ddd8d0;",
        f"--chat-sand:{s['chat_sand']};--chat-sand2:{s['chat_sand2']};--chat-sand3:{s['chat_sand3']};"
    )

    # --- chat bubble gradient + border ---
    html = html.replace(
        "linear-gradient(135deg,#C8854E,#a0673a,#8B5E3C)",
        s['bubble_grad']
    )
    html = html.replace(
        "border:2.5px solid #00C896",
        f"border:2.5px solid {s['bubble_border']}"
    )

    # --- copper shadow on bubble ---
    html = html.replace("rgba(160,103,58,", f"rgba({s['shadow']},")

    # --- glow keyframe ---
    html = html.replace(
        "rgba(160,103,58,0.4)",
        f"rgba({s['shadow']},0.4)"
    )
    html = html.replace(
        "rgba(160,103,58,0)",
        f"rgba({s['shadow']},0)"
    )

    # --- colorShift keyframe ---
    html = html.replace(
        "border-color:#00C896}50%{border-color:#a0673a",
        f"border-color:{s['bubble_border']}}}50%{{border-color:{s['accent']}"
    )

    # --- title ---
    html = html.replace(
        "<title>励康信息技术",
        f"<title>[{s['name']}] 励康信息技术"
    )

    # --- write ---
    out = os.path.join(os.path.dirname(__file__), f"index-{key}.html")
    with open(out, "w") as f:
        f.write(html)
    print(f"Generated: {out}")
