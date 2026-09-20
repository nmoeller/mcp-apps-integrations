---
name: delivery-risk
description: "Use when the user asks about blocked work, delivery risk, or where the team should intervene."
---

# Delivery Risk

1. Call `get_mock_data` with no arguments.
2. Rank coworkers by `blocked_tasks`, highest first.
3. Show one pie chart by calling `show_pie_chart` with:
   - `data`: the complete result from `get_mock_data`
   - `name_key`: `name`
   - `value_key`: `blocked_tasks`
4. Summarize the largest delivery risk and suggest investigating that blocker first.

Do not infer causes for blockers. Use only values returned by the tool.