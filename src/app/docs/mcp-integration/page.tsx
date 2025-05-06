
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const McpIntegrationPage = () => {
  return (
    <div className="container mx-auto p-4 page-fade-in text-center">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>MCP Integration Guide</h1>
      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4 text-left">
        <Card className="w-full shadow-lg border-primary text-left">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
              Integrating Model Context Protocol (MCP) Servers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--primary)' }}>Introduction to MCP</h2>
              <p>
                The Model Context Protocol (MCP) provides a standardized way for AI models to interact with external tools, services, and data sources. By integrating MCP servers, EbaAaZ can extend its capabilities and leverage a vast ecosystem of specialized functionalities.
              </p>
              <p>
                This guide outlines the general principles and steps for integrating MCP servers within the EbaAaZ Hub.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--primary)' }}>MCP Server Configuration in EbaAaZ</h2>
              <p>
                The EbaAaZ Hub provides a dedicated "MCP Server" page for managing and activating MCP integrations. Key aspects include:
              </p>
              <ul className="list-disc pl-5 space-y-1 my-2">
                <li><strong>Token Management:</strong> For MCPs requiring authentication (e.g., GitHub MCP), users can input their Personal Access Tokens (PATs). These tokens are hashed locally for security. The Hub can also utilize environment variables for token storage.</li>
                <li><strong>Server Activation:</strong> Users can activate or deactivate the MCP server connections.</li>
                <li><strong>MCP Options:</strong> Once an MCP server is active, users can access a sheet or sidebar displaying available modules and options provided by that MCP.</li>
                <li><strong>Interaction Modes:</strong> The Hub supports different interaction modes with MCPs, such as CLI (Command Line Interface) mode and potentially a visual/drag-and-drop mode.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--primary)' }}>Fetching MCP Options</h2>
              <p>
                EbaAaZ Hub dynamically fetches available MCP server options and modules from a trusted source. Currently, it attempts to fetch from:
                <code>https://raw.githubusercontent.com/modelcontextprotocol/mcp-hub-data/main/servers.json</code>
              </p>
              <p>
                This JSON file is expected to have a structure that includes "reference" servers and "third-party" servers (official and community). EbaAaZ parses this data to display available MCPs to the user.
              </p>
              <p>
                The application is also designed to handle potential future integration with a custom MCP server entry point like <code>https://github.com/Celebrum/CodeProject.AI-Server.git</code>, with AI tokens managed via a Sensai server volume. This implies a more sophisticated backend handshake and token storage mechanism for specific, trusted MCP integrations.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--primary)' }}>General MCP Configuration (Example for VS Code)</h2>
              <p>
                While EbaAaZ Hub provides a UI for managing MCPs, it's useful to understand the underlying configuration patterns, especially for development or manual setup. For example, integrating a GitHub MCP server in VS Code often involves modifying `settings.json` or a workspace `.vscode/mcp.json`:
              </p>
              <pre className="p-3 my-2 rounded-md bg-muted overflow-x-auto text-xs">
                <code>
{`// Example for User Settings (settings.json) for a GitHub MCP
"mcp": {
  "inputs": [
    {
      "type": "promptString",
      "id": "github_token_example",
      "description": "GitHub Personal Access Token for MCP",
      "password": true
    }
  ],
  "servers": {
    "github_mcp_example": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${input:github_token_example}"
      }
    }
  }
}`}
                </code>
              </pre>
              <p>
                This illustrates how commands, arguments, and environment variables (often including tokens) are specified for an MCP server. EbaAaZ aims to abstract this complexity through its UI.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--primary)' }}>Security Considerations</h2>
              <ul className="list-disc pl-5 space-y-1 my-2">
                <li><strong>Token Security:</strong> Sensitive tokens should always be handled securely. EbaAaZ Hub uses local hashing for UI-entered tokens and supports environment variables. For production, more robust secret management solutions are recommended.</li>
                <li><strong>Trusted MCP Sources:</strong> Only integrate MCP servers from trusted and verified sources to prevent security vulnerabilities.</li>
                <li><strong>Permissions/Scopes:</strong> When generating tokens (e.g., GitHub PATs), grant only the necessary permissions/scopes required by the MCP to perform its intended functions.</li>
              </ul>
            </section>

          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default McpIntegrationPage;
