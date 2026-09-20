# Team Status Cowork Plugin

This is a small Copilot Cowork plugin that mirrors the three skills and four
read-only tools exposed by the shared MCP server.
The three chart tools use MCP Apps metadata to render Prefab UI widgets inline
in Cowork. The package authorizes `cdn.jsdelivr.net`, which hosts the widget
renderer assets declared by the server resource CSP.

See the [root README](../../README.md) for the architecture and the
[server README](../../mcp_servers/data_server/README.md) for its capabilities.

## Demo flow

1. Start the MCP server:

   ```powershell
   Set-Location mcp_servers/data_server
   uv sync
   uv run python main.py
   ```

2. Create and host the persistent Dev Tunnel described in the
   [root README](../../README.md#create-a-persistent-dev-tunnel). The server's
   local protocol is HTTP, while Cowork receives a public HTTPS URL.

3. Replace `mcpServerUrl` in `manifest.json` with the static tunnel URL followed
   by `/mcp`.

4. Build the package from `integrations/cowork_plugin`:

   ```powershell
   Compress-Archive -Path manifest.json,color.png,outline.png,tools,skills -DestinationPath cowork-plugin.zip -Force
   ```

5. Install `cowork-plugin.zip` with Microsoft 365 Agents Toolkit or upload it as
   a custom app. Try: **Give me the weekly team status.**

The URLs under `developer` are demo placeholders. Replace them before publishing.