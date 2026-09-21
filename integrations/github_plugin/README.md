# GitHub Integration

This directory is reserved for the packaged GitHub integration. The working
GitHub Copilot example in this repository currently uses the VS Code MCP
configuration at `.vscode/mcp.json`.

For local GitHub Copilot use in VS Code, follow the
[VS Code README](../../.vscode/README.md). It connects directly to
`http://127.0.0.1:8000/mcp` and does not require a Dev Tunnel.

## Connect a remote GitHub client

The MCP server must already be running on `http://127.0.0.1:8000/mcp`. Keep its
terminal running throughout the demo.

A GitHub-hosted or otherwise remote client cannot reach localhost. Install the
Dev Tunnels CLI if needed, then create and host a named persistent tunnel:

```powershell
winget install Microsoft.devtunnel
devtunnel user login
devtunnel create my-mcp-tunnel --allow-anonymous
devtunnel port create my-mcp-tunnel -p 8000 --protocol http
devtunnel host my-mcp-tunnel
```

Keep the tunnel running. Restart it with `devtunnel host my-mcp-tunnel` to reuse
the same URL. In the remote GitHub client's MCP configuration, replace its server
URL with the `Connect via browser` URL followed by `/mcp`:

```text
https://<tunnel-host>.devtunnels.ms/mcp
```

The server remains unchanged: its Skills and MCP Apps are the source of agent
guidance and UI behavior.

See the [MCP server README](../../mcp_servers/data_server/README.md) for the
capabilities shared by all clients.