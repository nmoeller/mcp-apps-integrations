# Team Status Cowork Plugin

This is a small Copilot Cowork plugin that mirrors the three skills and four
read-only tools exposed by the MCP server in `../mock_data_server`.
The three chart tools use MCP Apps metadata to render Prefab UI widgets inline
in Cowork. The package authorizes `cdn.jsdelivr.net`, which hosts the widget
renderer assets declared by the server resource CSP.

## Demo flow

1. Start the MCP server:

   ```powershell
   Set-Location ../mock_data_server
   uv run python main.py
   ```

2. Expose port 8000 through an HTTPS dev tunnel. The local protocol is HTTP:

   ```powershell
   devtunnel host -p 8000 --allow-anonymous
   ```

3. Replace `https://replace-with-your-tunnel.devtunnels.ms/mcp` in
   `manifest.json` with the public HTTPS tunnel URL followed by `/mcp`.

4. Build the package from this directory:

   ```powershell
   Compress-Archive -Path manifest.json,color.png,outline.png,tools,skills -DestinationPath cowork-plugin.zip -Force
   ```

5. Install `cowork-plugin.zip` with Microsoft 365 Agents Toolkit or upload it as
   a custom app. Try: **Give me the weekly team status.**

The URLs under `developer` are demo placeholders. Replace them before publishing.