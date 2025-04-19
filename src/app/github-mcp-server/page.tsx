'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ListBullet, Terminal} from "lucide-react";
import {cn} from "@/lib/utils";

interface McpOption {
  id: string;
  label: string;
  description: string;
}

const GithubMCPServerPage = () => {
  const [githubToken, setGithubToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isTokenSetup, setIsTokenSetup] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [hashedToken, setHashedToken] = useState('');
  const [tokenExpiryDays, setTokenExpiryDays] = useState<number | null>(null);
  const [serverStatusColor, setServerStatusColor] = useState('bg-red-500'); // Initial red color
  const [isMCPActive, setIsMCPActive] = useState(false);
  const [mcpMode, setMcpMode] = useState<'cli' | 'visualisation'>('cli');
  const [mcpOptions, setMcpOptions] = useState<McpOption[]>([]); // Define mcpOptions as an array of McpOption

  const hashToken = useCallback(async (token: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }, []);

  const calculateTokenExpiry = useCallback(async (token: string) => {
    // Placeholder: Replace with actual API call to validate the token
    // and get its expiry or creation date.
    // This is just a simulation for demonstration purposes.
    return new Promise<number>((resolve) => {
      // Simulate a successful validation that takes 1 second
      setTimeout(() => {
        // For testing purposes, tokens are valid for 30 days.
        resolve(30);
      }, 1000);
    });
  }, []);

  const fetchMcpOptions = useCallback(async () => {
    try {
      // Use the provided external server URL
      const serverURL = "https://raw.githubusercontent.com/Celebrum/servers/main/servers.json";
      const response = await fetch(serverURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Extract MCP options from the fetched data
      const options: McpOption[] = data.servers.map((server: any) => ({
        id: server.id,
        label: server.name,
        description: server.description,
      }));

      setMcpOptions(options);
    } catch (error: any) {
      setError(`Failed to fetch MCP options: ${error.message}`);
      console.error("Error fetching MCP options:", error);
    }
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = localStorage.getItem('githubToken');
      if (storedToken) {
        setGithubToken(storedToken);
        setIsTokenSetup(true);
        return;
      }

      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (!token) {
        setError('GitHub Personal Access Token not found in environment variables.');
        console.error('GitHub Personal Access Token not found in environment variables.');
        setOpen(true);
        return;
      }
      setGithubToken(token);
      try {
        const hashed = await hashToken(token);
        setHashedToken(hashed);
        localStorage.setItem('githubToken', hashed);
        setIsTokenSetup(true);
      } catch (err) {
        setError('Error hashing the token.');
        console.error(err);
      }
    };
    loadToken();
    fetchMcpOptions(); // Fetch MCP options when the component mounts
  }, [hashToken, fetchMcpOptions]);

  useEffect(() => {
    if (githubToken && isTokenSetup) {
      const checkTokenValidity = async () => {
        try {
          const expiryDays = await calculateTokenExpiry(githubToken);
          setTokenExpiryDays(expiryDays);
        } catch (error) {
          console.error('Error calculating token expiry:', error);
          setError('Error calculating token expiry.');
          setServerStatusColor('bg-red-500'); // Set to red in case of error
          return;
        }
      };

      checkTokenValidity();
    }
  }, [githubToken, isTokenSetup, calculateTokenExpiry]);

  useEffect(() => {
    if (tokenExpiryDays !== null) {
      const updateStatusColor = () => {
        if (tokenExpiryDays <= 0) {
          setServerStatusColor('bg-red-500 animate-pulse'); // Flash red if expired
        } else if (tokenExpiryDays <= 7) {
          // Dark Orange if less than 7 days
          setServerStatusColor('bg-orange-500');
        } else {
          // Bright Green if more than 7 days
          setServerStatusColor('bg-green-500');
        }
      };

      updateStatusColor();

      // Set interval to update color every day
      const intervalId = setInterval(() => {
        setTokenExpiryDays(prevDays => (prevDays ? prevDays - 1 : 0));
      }, 24 * 60 * 60 * 1000); // Update every 24 hours

      return () => clearInterval(intervalId);
    }
  }, [tokenExpiryDays]);

  const handleTokenSubmit = async () => {
    if (!tempToken) {
      setError('GitHub Personal Access Token is required.');
      return;
    }

    try {
      const hashed = await hashToken(tempToken);
      setHashedToken(hashed);
      localStorage.setItem('githubToken', hashed);
      setGithubToken(hashed);
      setIsTokenSetup(true);
      setOpen(false);
      setError(null);
      const expiryDays = await calculateTokenExpiry(tempToken);
      setTokenExpiryDays(expiryDays);
    } catch (err) {
      setError('Error hashing the token.');
      console.error(err);
      setServerStatusColor('bg-red-500');
    }
  };

  const toggleMCPActivation = () => {
    setIsMCPActive(!isMCPActive);
  };

  const handleMcpModeChange = (mode: 'cli' | 'visualisation') => {
    setMcpMode(mode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold" style={{color: '#FF8C00'}}>
        MCP Server
      </h1>

      {error && <div className="text-red-500">Error: {error}</div>}

      {!isTokenSetup && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>GitHub Token Required</AlertDialogTitle>
              <AlertDialogDescription>
                To use the MCP Server, you need to provide a GitHub
                Personal Access Token.
                <br/>
                <a
                  href="https://github.com/settings/tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{color: '#FF8C00'}}
                >
                  Generate Token Here
                </a>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor="token">GitHub Token</Label>
                <Input
                  type="password"
                  id="token"
                  placeholder="Enter your GitHub Personal Access Token"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                />
              </div>
              <AlertDialogAction onClick={handleTokenSubmit}>
                Submit Token
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {hashedToken && (
        <div className="mt-4">
          <p>
            Hashed Token (SHA-256):{' '}
            <span className="font-mono break-all">{hashedToken}</span>
          </p>
        </div>
      )}

      <div className="mt-4">
        <Button
          className={cn(serverStatusColor, "text-white font-bold py-2 px-4 rounded")}
          onClick={toggleMCPActivation}
          disabled={!isTokenSetup}
        >
          {isMCPActive ? 'Deactivate MCP Server' : 'Activate MCP Server'}
        </Button>
        {tokenExpiryDays !== null && (
          <p className="mt-2">
            Token Validity: {tokenExpiryDays} days
          </p>
        )}
      </div>

      {isMCPActive && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mt-4">
              MCP Options
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>MCP Server Options</SheetTitle>
              <SheetDescription>
                Select your preferred mode and options for the MCP Server.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="mode">Mode:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={mcpMode === 'cli' ? 'default' : 'outline'}
                    onClick={() => handleMcpModeChange('cli')}
                  >
                    <Terminal className="mr-2 h-4 w-4"/> CLI Mode
                  </Button>
                  <Button
                    variant={mcpMode === 'visualisation' ? 'default' : 'outline'}
                    onClick={() => handleMcpModeChange('visualisation')}
                  >
                    <ListBullet className="mr-2 h-4 w-4"/> Visualisation Mode
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Available Options:</Label>
                {mcpOptions.map((option) => (
                  <Button key={option.id} variant="ghost">
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <p className="mt-4">
        The MCP Server is a Model Context Protocol (MCP) server that
        provides seamless integration with GitHub APIs, enabling advanced
        automation and interaction capabilities for developers and tools.
      </p>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Use Cases
        </h2>
        <ul>
          <li>Automating GitHub workflows and processes.</li>
          <li>Extracting and analyzing data from GitHub repositories.</li>
          <li>
            Building AI-powered tools and applications that interact with
            GitHub's ecosystem.
          </li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Prerequisites
        </h2>
        <p>
          To run the server, you will need to have Docker installed and running.
          You will also need to create a GitHub Personal Access Token.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Installation
        </h2>
        <p>
          For quick installation, use one of the one-click install buttons at
          the top of this README.
        </p>
        <p>
          For manual installation, add the following JSON block to your User
          Settings (JSON) file in VS Code or to a file called .vscode/mcp.json
          in your workspace.
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
          "GITHUB_PERSONAL_ACCESS_TOKEN": "${process.env.NEXT_PUBLIC_GITHUB_TOKEN}"
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
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Usage with Claude Desktop
        </h2>
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
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${process.env.NEXT_PUBLIC_GITHUB_TOKEN}"
      }
    }
  }
}
            `}
          </code>
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Build from source
        </h2>
        <p>
          If you don't have Docker, you can use go to build the binary in the
          cmd/github-mcp-server directory.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold" style={{color: '#FF8C00'}}>
          Tools
        </h2>
        <p>A list of available tools and their descriptions:</p>
        <ul>
          <li>get_me - Get details of the authenticated user</li>
          <li>
            get_issue - Gets the contents of an issue within a repository
          </li>
          <li>create_issue - Create a new issue in a GitHub repository</li>
          <li>add_issue_comment - Add a comment to an issue</li>
          {/* Add more tools here */}
        </ul>
      </section>
    </div>
  );
};

export default GithubMCPServerPage;

    
