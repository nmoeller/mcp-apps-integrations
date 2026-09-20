---
name: team-workload
description: "Use when the user asks about coworker workload, capacity, or who may need help."
---

# Team Workload

1. Call `get_mock_data` with no arguments.
2. Compare `assigned_tasks` with `weekly_capacity` for each coworker.
3. Show one bar chart by calling `show_chart` with:
   - `data`: the complete result from `get_mock_data`
   - `x_axis`: `name`
   - `y_axis`: `assigned_tasks`
   - `series_label`: `Assigned tasks`
4. Briefly identify who is over, at, or under capacity.

Use only values returned by the tool. Do not invent missing workload data.