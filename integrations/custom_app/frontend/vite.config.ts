import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { EventType, HttpAgent, type RunAgentInput, type ToolCallStartEvent } from '@ag-ui/client';
import { MCPAppsMiddleware } from '@ag-ui/mcp-apps-middleware';
import { filter } from 'rxjs';

const MCP_URL = 'http://127.0.0.1:8000/mcp';

// The agent re-emits the start/end pair of every tool call, and the repeat carries no arguments,
// so without this the middleware calls each chart tool a second time with `{}`.
class AgentEndpoint extends HttpAgent {
  run(input: RunAgentInput) {
    const seen = { start: new Set<string>(), end: new Set<string>() };
    const firstTime = (kind: 'start' | 'end', id: string) =>
      seen[kind].has(id) ? false : !!seen[kind].add(id);

    return super.run(input).pipe(
      filter((event) => {
        const id = (event as ToolCallStartEvent).toolCallId;
        // The terminal transcript repeats every tool call, which duplicates React keys and
        // remounts the rendered apps mid-handshake.
        if (event.type === EventType.MESSAGES_SNAPSHOT) return false;
        if (event.type === EventType.TOOL_CALL_START) return firstTime('start', id);
        if (event.type === EventType.TOOL_CALL_END) return firstTime('end', id);
        return true;
      }),
    );
  }
}

const agent = new AgentEndpoint({ url: process.env.AGENT_URL ?? 'http://127.0.0.1:8888/' });

const mcpApps = new MCPAppsMiddleware({
  mcpServers: [{ type: 'http', url: MCP_URL, serverId: 'charts' }],
});

// MCPAppsMiddleware is Node-only (uses crypto.createHash), so it runs here, not in the browser.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'agui-mcp-apps-proxy',
      configureServer(server) {
        server.middlewares.use('/agui', async (req, res) => {
          const body: Buffer[] = [];
          for await (const chunk of req) body.push(chunk as Buffer);

          res.setHeader('Content-Type', 'text/event-stream');
          // The agent lists each tool call twice in its transcript, so the middleware runs it twice.
          const sent = new Set<string>();
          mcpApps.run(JSON.parse(Buffer.concat(body).toString()), agent).subscribe({
            next: (event) => {
              const e = event as unknown as Record<string, string>;
              const key =
                e.type === EventType.ACTIVITY_SNAPSHOT
                  ? `app:${JSON.stringify(e.content)}`
                  : e.type === EventType.TOOL_CALL_RESULT
                    ? `result:${e.toolCallId}`
                    : undefined;
              if (key && sent.has(key)) return;
              if (key) sent.add(key);
              res.write(`data: ${JSON.stringify(event)}\n\n`);
            },
            error: (error) =>
              res.end(`data: ${JSON.stringify({ type: 'RUN_ERROR', message: String(error) })}\n\n`),
            complete: () => res.end(),
          });
        });
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    // The browser-side app bridge reads UI resources from the same MCP server.
    proxy: { '/mcp': { target: new URL(MCP_URL).origin, changeOrigin: true } },
  },
});