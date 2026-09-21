# VS Code Integration

This integration connects GitHub Copilot in VS Code directly to the local MCP
server. No Dev Tunnel is required.

## Prerequisite

The MCP server must be running at `http://127.0.0.1:8000/mcp`. From the
repository root, start it in a separate terminal:

```powershell
cd mcp_servers/data_server
uv sync
uv run python main.py
```

Leave that terminal running while using the integration.

## Run the demo

The checked-in `mcp.json` already uses the localhost endpoint.

1. Open this repository in VS Code.
2. Start or refresh `mock_data_server` in the MCP Servers view.
3. Open GitHub Copilot Chat in agent mode.
4. Try one of these prompts:

   ```text
   Give me the weekly delivery summary.
   Who is above or below weekly capacity?
   Where is blocked work putting delivery at risk?
   ```

The server-provided Skills steer the workflow, and supported clients render the
server-provided MCP Apps without client-specific visualization code.

Return to the [repository overview](../README.md) or review the
[MCP server capabilities](../mcp_servers/data_server/README.md).