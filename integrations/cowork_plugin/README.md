# Team Status Cowork Plugin

This is a small Copilot Cowork plugin that mirrors the three skills and four
read-only tools exposed by the shared MCP server.
The three chart tools use MCP Apps metadata to render Prefab UI widgets inline
in Cowork. The package authorizes `cdn.jsdelivr.net`, which hosts the widget
renderer assets declared by the server resource CSP.

See the [root README](../../README.md) for the architecture and the
[server README](../../mcp_servers/data_server/README.md) for its capabilities.

## Demo flow

1. Start the MCP server from the repository root in a separate terminal. The
   server must remain running for the entire demo:

   ```powershell
   cd mcp_servers/data_server
   uv sync
   uv run python main.py
   ```

2. Cowork needs a public HTTPS endpoint. Install the Dev Tunnels CLI if needed,
   then create and host a named persistent tunnel:

   ```powershell
   winget install Microsoft.devtunnel
   devtunnel user login
   devtunnel create my-mcp-tunnel --allow-anonymous
   devtunnel port create my-mcp-tunnel -p 8000 --protocol http
   devtunnel host my-mcp-tunnel
   ```

   Keep the tunnel running. Restart it later with
   `devtunnel host my-mcp-tunnel` to reuse the same URL. Do not use
   `devtunnel host -p 8000`, which creates a temporary URL.

3. Copy the `Connect via browser` URL, append `/mcp`, and replace
   `mcpServerUrl` in `manifest.json`:

   ```text
   https://<tunnel-host>.devtunnels.ms/mcp
   ```

4. From the repository root, enter the plugin directory and build the package:

   ```powershell
   cd integrations/cowork_plugin
   Compress-Archive -Path manifest.json,color.png,outline.png,tools,skills -DestinationPath cowork-plugin.zip -Force
   ```

5. Install `cowork-plugin.zip` with Microsoft 365 Agents Toolkit or upload it as
   a custom app. Try: **Give me the weekly team status.**

The URLs under `developer` are demo placeholders. Replace them before publishing.