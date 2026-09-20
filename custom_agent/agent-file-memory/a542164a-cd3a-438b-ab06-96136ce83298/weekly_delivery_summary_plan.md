# Plan: Weekly Delivery Summary

Goal: Generate the weekly delivery summary using the `weekly-delivery-summary` skill.

Steps:
1. Call `get_mock_data`.
2. Render three visualizations from the complete result:
   - Bar chart of `tasks_completed` by `name`
   - Line chart of `tasks_completed` by `name`
   - Pie chart of `tasks_completed` by `name`
3. Report:
   - who completed the most tasks
   - the team total
4. Use only tool-returned values and do not infer productivity or performance from task counts.
