import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import uvicorn
from agent_framework import (
    MCPSkillsSource,
    MCPStreamableHTTPTool,
    SkillsProvider,
    create_harness_agent,
)
from agent_framework.foundry import FoundryChatClient
from agent_framework_ag_ui import add_agent_framework_fastapi_endpoint
from azure.identity import DefaultAzureCredential
from fastapi import FastAPI
from mcp.client.session import ClientSession
from mcp.client.streamable_http import streamable_http_client

MCP_URL = "http://127.0.0.1:8000/mcp"

def required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"{name} environment variable is required")
    return value


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    async with streamable_http_client(url=MCP_URL) as (read, write, _), ClientSession(read, write) as session:
        await session.initialize()
        client = FoundryChatClient(
            project_endpoint=required_env("FOUNDRY_PROJECT_ENDPOINT"),
            model=required_env("FOUNDRY_MODEL"),
            credential=DefaultAzureCredential(),
        )
        skills = SkillsProvider(
            MCPSkillsSource(client=session),
            disable_load_skill_approval=True,
            disable_read_skill_resource_approval=True,
        )

        tools = MCPStreamableHTTPTool(
            name="cowork_mock_data",
            url=MCP_URL,
            session=session,
            allowed_tools=["get_mock_data"],
            approval_mode="never_require",
        )

        async with tools:
            agent = create_harness_agent(client, tools=tools, skills_provider=skills)
            add_agent_framework_fastapi_endpoint(app, agent, "/")
            yield


app = FastAPI(title="Work Harness AG-UI Server", lifespan=lifespan)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


def main() -> None:
    uvicorn.run(app, host="127.0.0.1", port=8888)


if __name__ == "__main__":
    main()
