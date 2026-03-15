"""Build a planner prompt from the GitHub event payload and repository files."""

import json
import os
from pathlib import Path

event_path = os.environ["GITHUB_EVENT_PATH"]
with open(event_path, "r", encoding="utf-8") as f:
    event = json.load(f)

issue = event["issue"]
title = issue["title"]
body = issue.get("body") or ""
number = issue["number"]


def read_text(path):
    p = Path(path)
    if p.exists():
        return p.read_text(encoding="utf-8")
    return f"[MISSING FILE: {path}]"


prompt = f"""You are the Planner agent for this repository.

Repository: {os.environ.get("GITHUB_REPOSITORY", "")}
Issue number: #{number}
Issue title: {title}

Issue body:
{body}

Current repository context:

--- README.md ---
{read_text("README.md")}

--- index.html ---
{read_text("index.html")}

--- app.js ---
{read_text("app.js")}

--- style.css ---
{read_text("style.css")}

Task:
Write a concise implementation plan for this issue.

Rules:
- Output Markdown only
- Start with: ## Planner output
- Include these sections:
  1. Summary
  2. Scope
  3. Affected files
  4. Implementation steps
  5. Test/validation ideas
  6. Risks / edge cases
- Keep it practical and short
- Do not write code
- Assume this repo should stay simple and static unless the issue clearly requires more
"""

Path("planner_prompt.txt").write_text(prompt, encoding="utf-8")
