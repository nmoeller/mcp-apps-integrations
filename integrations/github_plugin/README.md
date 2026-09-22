# Team Status GitHub Copilot CLI Plugin

This [Agent Plugins 1.0](https://agent-plugins.org/) package extends GitHub
Copilot CLI with three team-delivery skills and the shared team-status MCP
server:

- `weekly-delivery-summary`
- `team-workload`
- `delivery-risk`

The plugin follows GitHub's
[plugin creation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating).

## Prerequisites

- GitHub Copilot CLI
- Python 3.13 or later
- `uv`

## Run the demo

### 1. Start the MCP server

From the repository root, start the server in a separate terminal:

```powershell
cd mcp_servers/data_server
uv sync
uv run python main.py
```

Keep it running at `http://127.0.0.1:8000/mcp` while using the plugin.

### 2. Install the plugin

From the repository root:

```powershell
copilot plugin install ./integrations/github_plugin
copilot plugin list
```

Copilot CLI caches directly installed plugins. Run the install command again
after changing this plugin.

### 3. Verify and use it

Start an interactive Copilot CLI session:

```powershell
copilot
```

Use `/skills list` to confirm that the three skills loaded and `/mcp` to confirm
that the `team-status` server is connected. Then try:

```text
Give me the weekly delivery summary.
Who is above or below weekly capacity?
Where is blocked work putting delivery at risk?
```

The skills call the server's data and chart tools. See the
[MCP server README](../../mcp_servers/data_server/README.md) for the shared
capabilities.

## Uninstall

```powershell
copilot plugin uninstall team-status-demo
```