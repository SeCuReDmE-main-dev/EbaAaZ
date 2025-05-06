
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
      // Use the canonical URL for servers.json from mcp-hub-data
      const response = await fetch("https://raw.githubusercontent.com/modelcontextprotocol/mcp-hub-data/main/servers.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      const options: McpOption[] = [];

      if (data.reference && Array.isArray(data.reference)) {
        data.reference.forEach((server: any) => {
          if(server.id && server.name && server.description) {
            options.push({
              id: server.id,
              label: server.name,
              description: server.description,
            });
          }
        });
      }
      
      if (data['third-party']?.official && Array.isArray(data['third-party'].official)) {
         data['third-party'].official.forEach((server: any) => {
            if(server.id && server.name && server.description) {
                options.push({
                    id: server.id,
                    label: server.name,
                    description: server.description,
                });
            }
         });
      }

      if (data['third-party']?.community && Array.isArray(data['third-party'].community)) {
        data['third-party'].community.forEach((server: any) => {
            if(server.id && server.name && server.description) {
                options.push({
                    id: server.id,
                    label: server.name,
                    description: server.description,
                });
            }
        });
      }


      setMcpOptions(options);
    } catch (error: any) {
      setError(`Failed to fetch MCP options: ${error.message}`);
      console.error("Error fetching MCP options:", error);
    }
  }, []);


  useEffect(() => {
    const loadToken = async () => {
      const envToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const storedHashedToken = localStorage.getItem('githubHashedToken');

      if (envToken) {
        setGithubToken(envToken);
        try {
            const hashed = await hashToken(envToken);
            setHashedToken(hashed);
            localStorage.setItem('githubHashedToken', hashed); 
            setIsTokenSetup(true);
        } catch (err) {
            setError('Error hashing the environment token.');
            console.error(err);
        }
      } else if (storedHashedToken) {
        setHashedToken(storedHashedToken);
        setIsTokenSetup(true);
      } else {
        setOpenDialog(true);
      }
    };
    loadToken();
    fetchMcpOptions();
  }, [hashToken, fetchMcpOptions]);


  useEffect(() => {
    if (isTokenSetup && githubToken) { 
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
        setTokenExpiryDays(30);
    }
  }, [githubToken, isTokenSetup, hashedToken, calculateTokenExpiry]);


  useEffect(() => {
    if (tokenExpiryDays !== null) {
      const updateStatusColor = () => {
        if (tokenExpiryDays <= 0) {
          setServerStatusColor('bg-destructive animate-pulse');
        } else if (tokenExpiryDays <= 7) {
          setServerStatusColor('bg-primary'); 
        } else {
          setServerStatusColor('bg-green-500'); 
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
      localStorage.setItem('githubHashedToken', hashed);
      setGithubToken(tempToken); 
      setIsTokenSetup(true);
      setOpenDialog(false);
      setError(null);
      const expiryDays = await calculateTokenExpiry(tempToken); 
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
    <div className="container mx-auto p-4 page-fade-in text-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        MCP Server Configuration
      </h1>

      {error && !openDialog && <div className="text-destructive mb-4 text-center">Error: {error}</div>}

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent className="text-center">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle className="text-center">GitHub Token Required</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                To use the MCP Server, you need to provide a GitHub Personal Access Token.
                This token will be hashed and stored locally in your browser.
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
                <div className="grid gap-2 text-left"> {/* Label is typically left-aligned */}
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
            <AlertDialogFooter className="sm:justify-center"> {/* Center footer buttons */}
                <AlertDialogCancel onClick={() => {setOpenDialog(false); if(!isTokenSetup) setError('Token setup cancelled. MCP functionality may be limited.')}}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleTokenSubmit}>
                Submit Token
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      {isTokenSetup && hashedToken && (
        <div className="mt-4 p-3 bg-muted rounded-md text-center">
          <p className="text-sm">
            Stored Hashed Token (SHA-256):{' '}
            <span className="font-mono break-all text-xs">{hashedToken.substring(0,10)}...</span>
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          className={cn(serverStatusColor, "text-primary-foreground font-bold py-2 px-4 rounded hover:opacity-90")}
          onClick={toggleMCPActivation}
        >
          {isMCPActive ? 'Deactivate MCP Server' : 'Activate MCP Server'}
        </Button>
        {isTokenSetup && tokenExpiryDays !== null && (
          <p className="text-sm text-center">
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
          <SheetContent className="sm:max-w-md text-center">
            <SheetHeader className="text-center">
              <SheetTitle className="text-center">MCP Server Options</SheetTitle>
              <SheetDescription className="text-center">
                Select your preferred mode and options for the MCP Server.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="mode" className="text-center">Mode:</Label>
                <div className="flex gap-2 justify-center">
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
                <Label className="text-center">Available MCP Modules:</Label>
                {mcpOptions.length > 0 ? mcpOptions.map((option) => (
                  <Button key={option.id} variant="ghost" className="justify-center text-center h-auto py-2">
                    <div>
                        <p className="font-semibold">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </Button>
                )) : <p className="text-sm text-muted-foreground text-center">No MCP modules found or failed to load.</p>}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <Card className="mt-8 text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-center">About MCP Server Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
            <p>
                The Model Context Protocol (MCP) Server integration allows EbaAaZ
                to connect with various external tools and services, enabling advanced
                automation and interaction capabilities. This page facilitates the configuration
                and activation of these connections using necessary credentials, like a GitHub Personal Access Token for GitHub-related MCPs.
            </p>
            <section>
            <h3 className="text-lg font-semibold mb-2 text-center">
            General Use Cases for MCPs
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-left sm:text-center sm:list-inside"> {/* Adjusted for centering */}
            <li>Automating workflows across different platforms.</li>
            <li>Extracting and analyzing data from various sources (e.g., Git repositories, APIs, databases).</li>
            <li>
                Building AI-powered tools and applications that interact with
                a wide range of ecosystems.
            </li>
            <li>Enabling complex, multi-step operations orchestrated by AI.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-lg font-semibold mb-2 text-center">
            Prerequisites for GitHub MCP
            </h3>
            <p className="text-sm text-center">
            For GitHub-specific MCPs, you will typically need to create a GitHub Personal Access Token with appropriate scopes (e.g., `repo`, `workflow`, `user`).
            Other MCPs might require different authentication methods or API keys.
            </p>
        </section>
        </CardContent>
      </Card>


      <section className="mt-6 p-4 border rounded-md bg-card text-center">
        <h2 className="text-xl font-semibold mb-3 text-center">
          General MCP Configuration Guide (Example for GitHub)
        </h2>
        <p className="text-sm mb-2 text-center">
          To manually configure an MCP server (like the GitHub MCP Server) with VS Code, you might add something similar to the following to your User Settings (JSON) or a workspace `.vscode/mcp.json` file.
          The exact configuration depends on the specific MCP server.
        </p>
        <pre className="p-3 rounded-md bg-muted overflow-x-auto text-xs text-left"> {/* Preformatted text usually left-aligned */}
          <code>
            {`
// Example for User Settings (settings.json) for a GitHub MCP
"mcp": {
  "inputs": [
    {
      "type": "promptString",
      "id": "github_token_example", // Use a unique ID
      "description": "GitHub Personal Access Token for MCP",
      "password": true
    }
  ],
  "servers": {
    "github_mcp_example": { // Use a unique server ID
      "command": "docker", // Or your custom command for the specific MCP
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server" // Or the specific image/executable
      ],
      "env": {
        // Environment variable expected by the MCP server
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${input:github_token_example}"
      }
    }
  }
}

// For .vscode/mcp.json (mcp key is not needed at the root)
// {
//   "inputs": [ /* ... */ ],
//   "servers": { /* ... */ }
// }
            `}
          </code>
        </pre>
         <p className="text-sm mt-4 mb-2 text-center">
          Ensure your tokens and sensitive credentials are securely managed. For this application, GitHub tokens are hashed and stored locally if entered through the UI. Environment variables (e.g., `NEXT_PUBLIC_GITHUB_TOKEN` in a `.env.local` file) are another common method, but ensure `.env.local` is in your `.gitignore`.
        </p>
      </section>

    </div>
  );
};

export default GithubMCPServerPage;

    
