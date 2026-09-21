# Team Status Claude Plugin

This minimal plugin demonstrates the two core extension pieces together:

- **Skills:** teach Claude three focused team-delivery workflows.
- **MCP server:** provides the team data and chart tools.

See the [root README](../../README.md) for the architecture and the
[server README](../../mcp_servers/data_server/README.md) for its capabilities.

## Run the demo

### 1. Start the MCP server

The MCP server must be running for the entire demo. From the repository root,
start it in a separate terminal:

```powershell
cd mcp_servers/data_server
uv sync
uv run python main.py
```

Leave this terminal running. The local endpoint is
`http://127.0.0.1:8000/mcp`.

### 2. Create a persistent Dev Tunnel

Claude needs a public HTTPS endpoint. Install the Dev Tunnels CLI if needed,
then sign in and create a named tunnel once:

```powershell
winget install Microsoft.devtunnel
devtunnel user login
devtunnel create my-mcp-tunnel --allow-anonymous
devtunnel port create my-mcp-tunnel -p 8000 --protocol http
devtunnel host my-mcp-tunnel
```

Keep the tunnel running. The named tunnel retains the same URL when restarted
with `devtunnel host my-mcp-tunnel`. Do not use `devtunnel host -p 8000`, which
creates a temporary URL.

### 3. Configure the MCP URL

Copy the `Connect via browser` URL printed by the CLI, append `/mcp`, and replace
the `url` value in `.mcp.json`:

```text
https://<tunnel-host>.devtunnels.ms/mcp
```

### 4. Package and upload without the Claude CLI

From the repository root, create an uploadable ZIP package:

```powershell
cd integrations/claude_plugin
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