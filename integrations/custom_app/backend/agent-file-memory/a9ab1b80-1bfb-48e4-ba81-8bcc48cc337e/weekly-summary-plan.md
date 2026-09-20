# Weekly Summary Plan

User wants a weekly summary for the whole team.

## Open clarification
- Need the target week/date range. User said: 'my whole team just fetch all data', which resolves scope but not week.

## Execution plan
1. Fetch the weekly team data using the weekly-delivery-summary skill workflow.
2. Render the required bar, line, and pie charts from the complete returned dataset.
3. Summarize the team total and identify who completed the most tasks, using only tool-returned values.
4. Present the result concisely without inferring productivity from task counts.
