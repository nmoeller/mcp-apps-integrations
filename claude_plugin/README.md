# Team Status Claude Plugin

This minimal plugin demonstrates the two core extension pieces together:

- **Skills:** teach Claude three focused team-delivery workflows.
- **MCP server:** provides the team data and chart tools.

## Run the demo

Start the existing MCP server in one terminal:

```powershell
Set-Location ../mock_data_server
uv run python main.py
```

From the repository root, validate and launch Claude Code with the plugin:

```powershell
claude plugin validate ./claude_plugin --strict
claude --plugin-dir ./claude_plugin
```

Try any of these prompts:

```text
Give me the weekly delivery summary.
Who is above or below weekly capacity?
Where is blocked work putting delivery at risk?
```

Claude can invoke the skills automatically, or you can invoke them explicitly:

```text
/team-status-demo:weekly-delivery-summary
/team-status-demo:team-workload
/team-status-demo:delivery-risk
```

Use `/mcp` to confirm that the plugin-provided `team-status` server is connected.