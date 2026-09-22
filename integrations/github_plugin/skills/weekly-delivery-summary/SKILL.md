---
name: weekly-delivery-summary
description: "Use when a team lead asks for a weekly summary of tasks completed by each coworker."
---

# Weekly Delivery Summary

1. Call `get_mock_data` with no arguments.
2. Show these three visualizations using the complete result from `get_mock_data`:
   - Bar chart: call `show_chart` with:
     - `data`: the complete result
     - `x_axis`: `name`
     - `y_axis`: `tasks_completed`
     - `series_label`: `Tasks completed this week`
   - Line chart: call `show_line_chart` with:
     - `data`: the complete result
     - `x_axis`: `name`
     - `y_axis`: `tasks_completed`
     - `series_label`: `Tasks completed this week`
   - Pie chart: call `show_pie_chart` with:
     - `data`: the complete result
     - `name_key`: `name`
     - `value_key`: `tasks_completed`
3. State who completed the most tasks and the team total.

Use only values returned by the tool. Do not infer productivity or performance
from task counts.