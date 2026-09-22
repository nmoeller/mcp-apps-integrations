$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot 'mcp_servers/data_server/skills'
$destinations = @(
    'integrations/claude_plugin/skills'
    'integrations/cowork_plugin/skills'
    'integrations/github_plugin/skills'
)

Get-ChildItem -Path $source -Directory | ForEach-Object {
    $skill = $_

    foreach ($destination in $destinations) {
        $destinationRoot = Join-Path $PSScriptRoot $destination
        $destinationSkill = Join-Path $destinationRoot $skill.Name

        New-Item -ItemType Directory -Path $destinationRoot -Force | Out-Null
        Remove-Item -Path $destinationSkill -Recurse -Force -ErrorAction SilentlyContinue
        Copy-Item -Path $skill.FullName -Destination $destinationRoot -Recurse -Force
    }
}

Write-Host "Synced MCP server skills to $($destinations.Count) integration folders."
