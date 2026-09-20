# Team Status Claude Plugin

This minimal plugin demonstrates the two core extension pieces together:

- **Skills:** teach Claude three focused team-delivery workflows.
- **MCP server:** provides the team data and chart tools.

See the [root README](../../README.md) for the architecture and the
[server README](../../mcp_servers/data_server/README.md) for its capabilities.

## Run the demo

Start the MCP server from the repository root in one terminal:

```powershell
Set-Location mcp_servers/data_server
uv sync
uv run python main.py
```

Claude needs a public HTTPS endpoint. Create and host the persistent tunnel as
described in the [root README](../../README.md#create-a-persistent-dev-tunnel),
then replace the URL in `.mcp.json` with its static URL followed by `/mcp`.

## Package and upload without the Claude CLI

From the repository root, create an uploadable ZIP package:

```powershell
Set-Location integrations/claude_plugin
Compress-Archive -Path .claude-plugin,.mcp.json,skills -DestinationPath team-status-claude-plugin.zip -Force
```

The archive root must contain `.claude-plugin/`, `.mcp.json`, and `skills/`.
Upload `team-status-claude-plugin.zip` through the Claude client's plugin upload
interface, then enable the plugin. No Claude CLI installation is required.

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