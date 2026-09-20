import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import '@copilotkit/react-core/v2/styles.css';
import { CopilotChat, CopilotKitProvider, type ReactActivityMessageRenderer } from '@copilotkit/react-core/v2';
import { HttpAgent } from '@ag-ui/client';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { AppBridge, PostMessageTransport } from '@modelcontextprotocol/ext-apps/app-bridge';

const agent = new HttpAgent({ url: '/agui' });

// One shared MCP session: opening one per rendered app leaves later apps waiting forever.
let mcpClient: Promise<Client> | undefined;

function sharedMcpClient() {
  mcpClient ??= (async () => {
    const client = new Client({ name: 'cowork-host', version: '1.0.0' });
    await client.connect(new StreamableHTTPClientTransport(new URL('/mcp', location.origin)));
    return client;
  })();
  return mcpClient;
}

type McpAppContent = {
  resourceUri: string;
  toolInput: Record<string, unknown>;
  result: Parameters<AppBridge['sendToolResult']>[0];
};

// CopilotKit only needs safeParse here; the payload already comes from the middleware.
const mcpAppContent = {
  safeParse: (data: unknown) => ({ success: true as const, data: data as McpAppContent }),
} as unknown as ReactActivityMessageRenderer<McpAppContent>['content'];

function McpApp({ content }: { content: McpAppContent }) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;
    let bridge: AppBridge | undefined;
    let disposed = false;

    (async () => {
      const client = await sharedMcpClient();
      const resource = (await client.readResource({ uri: content.resourceUri })).contents[0];
      const html = resource && 'text' in resource ? resource.text : undefined;
      if (disposed || !iframe.contentWindow || typeof html !== 'string') return;

      bridge = new AppBridge(null, { name: 'cowork-host', version: '1.0.0' }, { serverTools: {}, logging: {} });
      bridge.oninitialized = () => {
        void bridge?.sendToolInput({ arguments: content.toolInput });
        void bridge?.sendToolResult(content.result);
      };

      // Listen before the app document loads, otherwise its initialize request is missed.
      await bridge.connect(new PostMessageTransport(iframe.contentWindow, iframe.contentWindow));
      iframe.srcdoc = html;
    })();

    return () => {
      disposed = true;
      void bridge?.close();
    };
  }, [content]);

  return (
    <iframe
      ref={frame}
      sandbox="allow-scripts"
      style={{ width: '100%', height: 420, border: '1px solid #e5e7eb', borderRadius: 12 }}
    />
  );
}

function App() {
  return (
    <CopilotKitProvider
      agents__unsafe_dev_only={{ default: agent }}
      showDevConsole={false}
      renderActivityMessages={[
        { activityType: 'mcp-apps', content: mcpAppContent, render: ({ content }) => <McpApp content={content} /> },
      ]}
    >
      <div style={{ height: '100vh', padding: 16, boxSizing: 'border-box' }}>
        <div style={{ height: '100%', width: '100%', maxWidth: 1100, margin: '0 auto' }}>
          <CopilotChat agentId="default" style={{ height: '100%' }} />
        </div>
      </div>
    </CopilotKitProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
