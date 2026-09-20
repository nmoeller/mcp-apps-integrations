# Harness Agent with AG-UI

A small [Microsoft Agent Framework harness](https://learn.microsoft.com/agent-framework/concepts/harness?pivots=programming-language-python) exposed as a streaming [AG-UI](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/?pivots=programming-language-python) FastAPI endpoint.

The harness includes Agent Framework's default planning, todo tracking, session file memory, tool approval, compaction, and observability capabilities. AG-UI provides the remote HTTP and Server-Sent Events transport.

## Run

Prerequisites:

- Python 3.13 or later
- `uv`
- Azure CLI authentication with access to an Azure OpenAI deployment

From this directory, install the prerelease Agent Framework packages:

```powershell
uv sync --prerelease=allow
az login
```

Configure the Azure OpenAI resource and deployment:

```powershell
$env:AZURE_OPENAI_ENDPOINT = "https://<resource>.openai.azure.com/"
$env:AZURE_OPENAI_CHAT_COMPLETION_MODEL = "<deployment-name>"
# Optional when the service default is not suitable:
$env:AZURE_OPENAI_API_VERSION = "<api-version>"
```

Start the server:

```powershell
uv run --frozen python main.py
```

The AG-UI endpoint is `POST http://127.0.0.1:8888/`. Its streamed response uses Server-Sent Events. The readiness endpoint is `GET http://127.0.0.1:8888/health`.

Any AG-UI client can connect to the root endpoint. For an interactive test UI, configure AG-UI Dojo or a CopilotKit `HttpAgent` with `http://127.0.0.1:8888/`.
