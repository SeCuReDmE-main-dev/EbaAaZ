import React from 'react';

const GithubMCPServerPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold" style={{ color: '#FF8C00' }}>GitHub MCP Server</h1>
      <p>
        The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with GitHub APIs, enabling advanced automation and interaction capabilities for developers and tools.
      </p>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Use Cases</h2>
        <ul>
          <li>Automating GitHub workflows and processes.</li>
          <li>Extracting and analyzing data from GitHub repositories.</li>
          <li>Building AI-powered tools and applications that interact with GitHub's ecosystem.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Prerequisites</h2>
        <p>To run the server, you will need to have Docker installed and running. You will also need to create a GitHub Personal Access Token.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Installation</h2>
        <p>For quick installation, use one of the one-click install buttons at the top of this README.</p>
        <p>
          For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code or to a file called .vscode/mcp.json in your workspace.
        </p>
        <pre>
          <code>
            {`
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "github_token",
        "description": "GitHub Personal Access Token",
        "password": true
      }
    ],
    "servers": {
      "github": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "GITHUB_PERSONAL_ACCESS_TOKEN",
          "ghcr.io/github/github-mcp-server"
        ],
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "\${input:github_token}"
        }
      }
    }
  }
}
            `}
          </code>
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Usage with Claude Desktop</h2>
        <pre>
          <code>
            {`
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
            `}
          </code>
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Build from source</h2>
        <p>If you don't have Docker, you can use go to build the binary in the cmd/github-mcp-server directory.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{ color: '#FF8C00' }}>Tools</h2>
        <p>A list of available tools and their descriptions:</p>
        <ul>
          <li>get_me - Get details of the authenticated user</li>
          <li>get_issue - Gets the contents of an issue within a repository</li>
          <li>create_issue - Create a new issue in a GitHub repository</li>
          <li>add_issue_comment - Add a comment to an issue</li>
          {/* Add more tools here */}
        </ul>
      </section>
    </div>
  );
};

export default GithubMCPServerPage;
