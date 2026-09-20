# GitHub Integration

This directory is reserved for the packaged GitHub integration. The working
GitHub Copilot example in this repository currently uses the VS Code MCP
configuration at `.vscode/mcp.json`.

For local GitHub Copilot use in VS Code, follow the
[VS Code setup](../../README.md#use-the-server-from-vs-code); it connects directly
to `http://127.0.0.1:8000/mcp`.

A GitHub-hosted or otherwise remote client cannot reach localhost. Configure that
client with the persistent Dev Tunnel URL followed by `/mcp`, using the
[Dev Tunnel instructions](../../README.md#create-a-persistent-dev-tunnel). The
server remains unchanged: its Skills and MCP Apps are the source of agent
guidance and UI behavior.

See the [MCP server README](../../mcp_servers/data_server/README.md) for the
capabilities shared by all clients.