# Custom MCP Apps Client

This integration proves that the shared MCP server is not tied to a hosted
client. It combines a Microsoft Agent Framework backend with a Vite frontend and
renders the server's MCP Apps locally.

Read the [repository overview](../../README.md), the
[MCP server guide](../../mcp_servers/data_server/README.md), and the
[backend guide](backend/README.md) for configuration details.

## Run locally

No Dev Tunnel is required. Open three terminals from the repository root.

1. Start the MCP server on `http://127.0.0.1:8000/mcp`:

   ```powershell
   Set-Location mcp_servers/data_server
   uv sync
   uv run python main.py
   ```

2. Configure Azure OpenAI and start the backend on `http://127.0.0.1:8888/`:

   ```powershell
   Set-Location integrations/custom_app/backend
   uv sync --prerelease=allow
   az login
   $env:AZURE_OPENAI_ENDPOINT = "https://<resource>.openai.azure.com/"
   $env:AZURE_OPENAI_CHAT_COMPLETION_MODEL = "<deployment-name>"
   uv run --frozen python main.py
   ```

3. Install and start the frontend:

   ```powershell
   Set-Location integrations/custom_app/frontend
   npm install
   npm run dev
   ```

Open `http://127.0.0.1:3000`. The Vite development server proxies `/mcp` to the
local MCP server and connects to the local agent backend.