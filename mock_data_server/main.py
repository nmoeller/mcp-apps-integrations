import json
from pathlib import Path

from fastmcp import FastMCP
from fastmcp.apps.config import PrefabAppConfig, ResourceCSP
from fastmcp.server.providers.skills import SkillsDirectoryProvider

from tools.charts import show_chart, show_line_chart, show_pie_chart
from tools.data import get_mock_data

CHART_APP = PrefabAppConfig(
    visibility=["model"],
    csp=ResourceCSP(
        connect_domains=["https://cdn.jsdelivr.net"],
        resource_domains=["https://cdn.jsdelivr.net"],
    ),
)

skills_provider = SkillsDirectoryProvider(roots=Path(__file__).parent / "skills")
mcp = FastMCP(name="CoworkMockDataServer", providers=[skills_provider])


@mcp.resource("skill://index.json")
def skill_index() -> str:
    return json.dumps({"skills": [
        {
            "type": "skill-md",
            "name": provider.skill_info.name,
            "description": provider.skill_info.description,
            "url": f"skill://{provider.skill_info.name}/SKILL.md",
        }
        for provider in skills_provider.providers
    ]})


mcp.tool(
    get_mock_data,
    title="Get Team Status Data",
    annotations={"readOnlyHint": True, "destructiveHint": False},
)
mcp.tool(
    app=CHART_APP,
    title="Show Bar Chart",
    annotations={"readOnlyHint": True, "destructiveHint": False},
)(show_chart)
mcp.tool(
    app=CHART_APP,
    title="Show Line Chart",
    annotations={"readOnlyHint": True, "destructiveHint": False},
)(show_line_chart)
mcp.tool(
    app=CHART_APP,
    title="Show Pie Chart",
    annotations={"readOnlyHint": True, "destructiveHint": False},
)(show_pie_chart)


def main() -> None:
    mcp.run(transport="http", host="127.0.0.1", port=8000)


if __name__ == "__main__":
    main()
