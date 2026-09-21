# Team Status MCP Server

This is the shared foundation for every integration in the
[repository](../../README.md). It keeps the agent behavior portable by publishing
the team-status tools, MCP Apps, and Skills directly from the MCP server.

## Run locally

Prerequisites are Python 3.13 or later and `uv`. From this directory:

```powershell
uv sync
uv run python main.py
```

The Streamable HTTP endpoint is `http://127.0.0.1:8000/mcp`.

VS Code and the [custom app](../../integrations/custom_app/README.md) connect to
this localhost URL. Cowork, Claude, and remote GitHub clients use the same local
process through persistent Dev Tunnels documented in their integration guides.

## Published capabilities

- `get_mock_data` returns the shared team-delivery dataset.
- `show_chart` renders a bar chart as an MCP App.
- `show_line_chart` renders a line chart as an MCP App.
- `show_pie_chart` renders a pie chart as an MCP App.
- `skill://index.json` advertises the Skills stored in `skills/`.

## Demo story

A team lead is preparing a weekly planning meeting. The facts live in one small
mock dataset, but the lead asks three different questions. Each question activates
a focused skill that reuses the same MCP tools.

| Skill | Question | Visualization | Outcome |
| --- | --- | --- | --- |
| `weekly-delivery-summary` | "Summarize the tasks completed by each coworker this week." | Bar, line, and pie charts | Shows the top contributor and team total from several perspectives. |
| `team-workload` | "Who is above or below weekly capacity?" | Bar chart | Reviews assigned work against capacity. |
| `delivery-risk` | "Where is blocked work putting delivery at risk?" | Pie chart | Highlights each coworker's share of blocked work. |

This keeps the demonstration minimal: one data tool, three chart tools, and three
skills that provide different instructions and intent.

## Client guides

- [Cowork](../../integrations/cowork_plugin/README.md)
- [Claude](../../integrations/claude_plugin/README.md)
- [GitHub](../../integrations/github_plugin/README.md)
- [Custom app](../../integrations/custom_app/README.md)
- [VS Code](../../.vscode/README.md)
