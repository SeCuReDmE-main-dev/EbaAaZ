
'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {List, Terminal} from "lucide-react";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [hashedToken, setHashedToken] = useState('');
  const [tokenExpiryDays, setTokenExpiryDays] = useState<number | null>(null);
  const [serverStatusColor, setServerStatusColor] = useState('bg-muted');
  const [isMCPActive, setIsMCPActive] = useState(false);
  const [mcpMode, setMcpMode] = useState<'cli' | 'visualisation'>('cli');
  const [mcpOptions, setMcpOptions] = useState<McpOption[]>([]);

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
    // Placeholder for actual token validation and expiry calculation
    // For demo, assume token is valid for 30 days from setup.
    // In a real scenario, you would call GitHub's API or a validation service.
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        // Simulate API call
        // This example uses a fixed 30-day validity for simplicity
        resolve(30);
      }, 1000);
    });
  }, []);

  const fetchMcpOptions = useCallback(async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/Celebrum/servers/main/servers.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
      const envToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const storedToken = localStorage.getItem('githubToken'); // This would be the hashed token

      if (envToken) {
        setGithubToken(envToken); // Store the actual token for validation logic
        try {
            const hashed = await hashToken(envToken);
            setHashedToken(hashed); // For display
            setIsTokenSetup(true);
        } catch (err) {
            setError('Error hashing the environment token.');
            console.error(err);
        }
      } else if (storedToken) {
        // If only a stored (hashed) token exists, it means it was manually entered.
        // We don't have the raw token to validate directly here,
        // but we know it was set up.
        setHashedToken(storedToken);
        setIsTokenSetup(true);
        // We might need to re-prompt for the token if validation requires the raw token
        // or assume it's valid until a real validation fails.
        // For this example, we proceed as if it's set up.
      } else {
        setError('GitHub Personal Access Token not found. Please set it up.');
        console.error('GitHub Personal Access Token not found.');
        setOpenDialog(true);
      }
    };
    loadToken();
    fetchMcpOptions();
  }, [hashToken, fetchMcpOptions]);


  useEffect(() => {
    if (isTokenSetup && githubToken) { // Only validate if the raw token is available
      const checkTokenValidity = async () => {
        try {
          const expiryDays = await calculateTokenExpiry(githubToken);
          setTokenExpiryDays(expiryDays);
        } catch (error) {
          console.error('Error calculating token expiry:', error);
          setError('Error calculating token expiry.');
          setServerStatusColor('bg-destructive');
        }
      };
      checkTokenValidity();
    } else if (isTokenSetup && !githubToken && hashedToken) {
        // If token is set up (manually entered previously) but raw token isn't in state
        // We can't validate it here. We'll rely on the stored expiry or show a default.
        // For simplicity, let's assume it needs re-validation if raw token is not present
        // or rely on a previously stored expiry if available.
        // For this demo, if only hashed token is present, we'll just set a default positive expiry.
        setTokenExpiryDays(30); // Default to 30 days if only hashed token is present
    }
  }, [githubToken, isTokenSetup, hashedToken, calculateTokenExpiry]);


  useEffect(() => {
    if (tokenExpiryDays !== null) {
      const updateStatusColor = () => {
        if (tokenExpiryDays <= 0) {
          setServerStatusColor('bg-destructive animate-pulse');
        } else if (tokenExpiryDays <= 7) {
          setServerStatusColor('bg-primary'); // Orange
        } else {
          setServerStatusColor('bg-green-500'); // Bright Green
        }
      };
      updateStatusColor();
      const intervalId = setInterval(() => {
        setTokenExpiryDays(prevDays => (prevDays ? Math.max(0, prevDays - 1) : 0));
      }, 24 * 60 * 60 * 1000);
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
      setGithubToken(tempToken); // Store the actual token for current session validation
      setIsTokenSetup(true);
      setOpenDialog(false);
      setError(null);
      const expiryDays = await calculateTokenExpiry(tempToken); // Validate the newly submitted token
      setTokenExpiryDays(expiryDays);
    } catch (err) {
      setError('Error processing the token.');
      console.error(err);
      setServerStatusColor('bg-destructive');
    }
  };

  const toggleMCPActivation = () => {
    if (!isTokenSetup) {
        setOpenDialog(true);
        return;
    }
    setIsMCPActive(!isMCPActive);
  };

  const handleMcpModeChange = (mode: 'cli' | 'visualisation') => {
    setMcpMode(mode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        MCP Server Configuration
      </h1>

      {error && !openDialog && <div className="text-destructive mb-4">Error: {error}</div>}

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>GitHub Token Required</AlertDialogTitle>
              <AlertDialogDescription>
                To use the MCP Server, you need to provide a GitHub Personal Access Token.
                If you have already set the NEXT_PUBLIC_GITHUB_TOKEN environment variable, this step might not be necessary unless the token is invalid or expired.
                <br/>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo,workflow,user"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Generate Token Here (repo, workflow, user scopes recommended)
                </a>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="token">GitHub Token</Label>
                    <Input
                    type="password"
                    id="token"
                    placeholder="Enter your GitHub Personal Access Token"
                    value={tempToken}
                    onChange={(e) => setTempToken(e.target.value)}
                    />
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {setOpenDialog(false); setError(null)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleTokenSubmit}>
                Submit Token
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      {isTokenSetup && hashedToken && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            Stored Hashed Token (SHA-256):{' '}
            <span className="font-mono break-all text-xs">{hashedToken}</span>
          </p>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Button
          className={cn(serverStatusColor, "text-primary-foreground font-bold py-2 px-4 rounded hover:opacity-90")}
          onClick={toggleMCPActivation}
        >
          {isMCPActive ? 'Deactivate MCP Server' : 'Activate MCP Server'}
        </Button>
        {isTokenSetup && tokenExpiryDays !== null && (
          <p className="text-sm">
            Token Validity: {tokenExpiryDays} days remaining
          </p>
        )}
         {!isTokenSetup && (
             <Button variant="outline" onClick={() => setOpenDialog(true)}>Set GitHub Token</Button>
         )}
      </div>

      {isMCPActive && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mt-4">
              MCP Options
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
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
                    size="sm"
                  >
                    <Terminal className="mr-2 h-4 w-4"/> CLI Mode
                  </Button>
                  <Button
                    variant={mcpMode === 'visualisation' ? 'default' : 'outline'}
                    onClick={() => handleMcpModeChange('visualisation')}
                    size="sm"
                  >
                    <List className="mr-2 h-4 w-4"/> Visualisation Mode
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Available MCP Modules:</Label>
                {mcpOptions.length > 0 ? mcpOptions.map((option) => (
                  <Button key={option.id} variant="ghost" className="justify-start text-left h-auto py-2">
                    <div>
                        <p className="font-semibold">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </Button>
                )) : <p className="text-sm text-muted-foreground">No MCP modules found or failed to load.</p>}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About GitHub MCP Server</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>
                The GitHub MCP Server is a Model Context Protocol (MCP) server that
                provides seamless integration with GitHub APIs, enabling advanced
                automation and interaction capabilities for developers and tools.
                This page allows you to configure and activate the server using your GitHub Personal Access Token.
            </p>
            <section>
            <h3 className="text-lg font-semibold mb-2">
            Use Cases
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Automating GitHub workflows and processes.</li>
            <li>Extracting and analyzing data from GitHub repositories.</li>
            <li>
                Building AI-powered tools and applications that interact with
                GitHub's ecosystem.
            </li>
            </ul>
        </section>

        <section>
            <h3 className="text-lg font-semibold mb-2">
            Prerequisites
            </h3>
            <p className="text-sm">
            To run the server, you will need to have Docker installed and running (if using Docker-based MCPs).
            You will also need to create a GitHub Personal Access Token with appropriate scopes (e.g., `repo`, `workflow`, `user`).
            </p>
        </section>
        </CardContent>
      </Card>


      <section className="mt-6 p-4 border rounded-md bg-card">
        <h2 className="text-xl font-semibold mb-3">
          Installation & Usage Guide
        </h2>
        <p className="text-sm mb-2">
          For manual installation with VS Code, add the following to your User Settings (JSON) or a workspace `.vscode/mcp.json` file:
        </p>
        <pre className="p-3 rounded-md bg-muted overflow-x-auto text-xs">
          <code>
            {`
// For User Settings (settings.json)
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
      "command": "docker", // Or your custom command
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server" // Example, replace if needed
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${env:NEXT_PUBLIC_GITHUB_TOKEN:input:github_token}"
      }
    }
  }
}

// For .vscode/mcp.json (mcp key is not needed at the root)
{
  "inputs": [ /* ... */ ],
  "servers": { /* ... */ }
}
            `}
          </code>
        </pre>
         <p className="text-sm mt-4 mb-2">
          Ensure your GitHub token is securely managed, either through VS Code's prompt or by setting the `NEXT_PUBLIC_GITHUB_TOKEN` environment variable in a `.env.local` file (which should be gitignored).
        </p>
      </section>

    </div>
  );
};

export default GithubMCPServerPage;

    