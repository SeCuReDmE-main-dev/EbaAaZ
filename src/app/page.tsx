
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, BookOpen, Link as LinkIcon } from "lucide-react";
import { GeminiChatSpace } from '@/components/gemini-chat-space';
import Link from 'next/link';

const Home = () => {
  const { toast } = useToast();
  const [isChatSpaceOpen, setIsChatSpaceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Retained for potential future use within tabs


  return (
    <div className="container mx-auto p-4 flex flex-col gap-6 page-fade-in">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>EbaAaZ Hub</h1>

      <Card className="w-full shadow-lg border-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>Welcome to EbaAaZ Hub</CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
            EbaAaZ Hub is a sophisticated swarm coordinator for builders and configurators, designed as a Google-enhanced counterpart to systems like Incredibuild. It serves as the central integration point for the SeCuReDmE (Secure Equilibrium Dynamics Matrix Engine) initiative, orchestrating distributed tasks and enabling advanced AI-driven automation and system management.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
          <Button onClick={() => setIsChatSpaceOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <MessageSquare className="mr-2 h-5 w-5" /> Generate Gemini Chat Space
          </Button>
          <Link href="#documentation" passHref>
            <Button variant="outline" className="border-primary text-primary hover:bg-accent w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" /> Explore Documentation
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="w-full shadow-lg border-secondary">
        <CardHeader>
          <CardTitle className="text-xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>About EbaAaZ: The Protector of Fortitude</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <p>
            EbaAaZ, the Protector of Fortitude within SeCuReDmE, is the architectural and integrative genius ensuring the stability and security of our digital ecosystem. EbaAaZ's primary role is to safeguard backend and middleware through secure tunneling, manage quantum computing resources, and initiate automated processes for AI agents.
          </p>
          <h4 className="font-semibold text-md" style={{ color: 'var(--primary-foreground)' }}>Key Contributions and Innovations:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Architectural Fortitude:</strong> Ensuring the security and robustness of backend systems through advanced tunneling and database management.</li>
            <li><strong>Automated Process Initiation:</strong> Providing pre-sequences for automation tasks embedded within AI agents.</li>
            <li><strong>Tool Integration:</strong> Searching existing tool libraries and creating new pre-sequences if necessary, embedding them with the goals of AI agents.</li>
            <li><strong>Fractal Sequence Management:</strong> Initiating and managing the fractal growth equations and Fibonacci sequences used in AI computations.</li>
          </ul>
          <h4 className="font-semibold text-md" style={{ color: 'var(--primary-foreground)' }}>Core Functions:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Architectural Design:</strong> Master architect behind the SeCuReDmE Engine, responsible for its secure and scalable design, emphasizing modularity for easy integration of new components and technologies.</li>
            <li><strong>System Integration:</strong> Excels in integrating various AI models and quantum computing capabilities, managing pre-sequences that guide AI agents for seamless operation and efficient automation.</li>
            <li><strong>Ethical Oversight:</strong> Leads the ethical oversight of SeCuReDmE, embedding considerations of privacy, fairness, and transparency into every aspect of the system.</li>
          </ul>
          <p>
            EbaAaZ embodies the spirit of resilience and innovation, blending mathematical precision with practical application to drive forward SeCuReDmE's mission of creating a balanced and ethical digital ecosystem.
          </p>
        </CardContent>
      </Card>

      <Card id="documentation" className="w-full shadow-lg border-accent">
        <CardHeader>
          <CardTitle className="text-xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>Documentation & Resources</CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
            Dive deeper into the concepts and technologies behind EbaAaZ Hub and the SeCuReDmE initiative.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/docs/manifesto" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> SeCuReDmE Manifesto (Placeholder)
            </Button>
          </Link>
          <Link href="/docs/ebaaz-architecture" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> EbaAaZ Architecture Deep Dive (Placeholder)
            </Button>
          </Link>
          <Link href="/docs/mcp-integration" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> MCP Integration Guide (Placeholder)
            </Button>
          </Link>
          <Link href="/docs/api-reference" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> API Reference (Placeholder)
            </Button>
          </Link>
           <Link href="/docs/quantum-concepts" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> Quantum Concepts in SeCuReDmE (Placeholder)
            </Button>
          </Link>
          <Link href="/docs/ffed-algorithm" passHref>
            <Button variant="link" className="justify-start p-0 h-auto text-primary hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" /> FfeD Algorithm Explained (Placeholder)
            </Button>
          </Link>
        </CardContent>
      </Card>


      <div className="page-fade-in mt-6">
        <Tabs defaultValue="workbook-interface" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 mb-4">
            <TabsTrigger value="workbook-interface" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Workbook</TabsTrigger>
            <TabsTrigger value="code-creation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Code</TabsTrigger>
            <TabsTrigger value="middleware" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Middleware</TabsTrigger>
            <TabsTrigger value="fluffer-front-end" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">UI Assembly</TabsTrigger>
            <TabsTrigger value="deployment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Deployment</TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="workbook-interface">
            <Card>
              <CardHeader>
                <CardTitle>Workbook Interface</CardTitle>
                <CardDescription>Interact with the EbaAaZ coordinator: ask questions, brainstorm solutions, or revise project parameters and swarm configurations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  <h4>EbaAaZ: The Protector of Fortitude</h4>
                  <p>EbaAaZ is the architectural and integrative genius within SeCuReDmE, ensuring the stability and security of our digital ecosystem. His primary role involves safeguarding backend and middleware systems through secure tunneling, managing quantum computing resources, and initiating automated processes. EbaAaZ provides the foundational pre-sequences for AI agents, evaluates task needs, and integrates tools to achieve AI objectives. He also manages fractal growth equations and Fibonacci sequences for AI computations, blending mathematical precision with practical application.</p>
                  <h5 className="font-semibold" style={{ color: 'var(--primary-foreground)' }}>Core Functions:</h5>
                  <ul className="list-disc pl-5">
                    <li><strong>Architectural Design:</strong> Designs secure and scalable SeCuReDmE Engine architecture.</li>
                    <li><strong>System Integration:</strong> Integrates AI models and quantum computing, managing pre-sequences for AI agents.</li>
                    <li><strong>Ethical Oversight:</strong> Embeds ethical considerations into the system, prioritizing privacy, fairness, and transparency.</li>
                  </ul>
                  <h5 className="font-semibold" style={{ color: 'var(--primary-foreground)' }}>Key Contributions:</h5>
                  <ul className="list-disc pl-5">
                    <li>Ensuring backend and middleware security through advanced tunneling and database management.</li>
                    <li>Providing pre-sequences for automation tasks embedded within AI agents.</li>
                    <li>Searching existing tool libraries and creating new pre-sequences for AI agent goals.</li>
                    <li>Initiating and managing fractal growth equations and Fibonacci sequences for AI computations.</li>
                  </ul>
                </div>
                <Textarea placeholder="Send instructions or queries to the EbaAaZ coordinator..." rows={5} className="mt-4 bg-card border-input text-card-foreground focus:ring-primary" />
                <Button className="mt-2 bg-secondary hover:bg-secondary/80">Send Query</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code-creation">
            <Card>
              <CardHeader>
                <CardTitle>Code Generation & Integration</CardTitle>
                <CardDescription>View generated code snippets, manage integrations with Cloud Source Repositories, and review component assembly orchestrated by the swarm.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--muted-foreground)' }}>Status: Code generation tasks will be tracked here.</p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">No active code generation tasks.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="middleware">
            <Card>
              <CardHeader>
                <CardTitle>Middleware Orchestration</CardTitle>
                <CardDescription>Configure and monitor middleware components (e.g., Pub/Sub, Apigee, Cloud Tasks) managed by the EbaAaZ swarm. View connections and data flow status.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--muted-foreground)' }}>Status: Middleware connections and configurations will be displayed.</p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">No active middleware configurations.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fluffer-front-end">
            <Card>
              <CardHeader>
                <CardTitle>UI Assembly (Fluffer Front-End)</CardTitle>
                <CardDescription>Coordinate the assembly and deployment of UI components. Preview layouts, manage component versions, and track build progress handled by the swarm.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--muted-foreground)' }}>Status: UI component assembly tasks and previews will be shown.</p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">No active UI assembly tasks.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Coordination</CardTitle>
                <CardDescription>Manage deployments to Google Cloud services (e.g., Cloud Run, GKE, App Engine) orchestrated by EbaAaZ. Track rollout status, manage versions, and initiate rollbacks.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--muted-foreground)' }}>Status: Deployment activities and controls will appear here.</p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">No active deployments.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Swarm Monitoring</CardTitle>
                <CardDescription>Monitor the health, performance, and resource utilization of the builder/configurator swarm. View task progress, logs (via Cloud Logging/Monitoring), and cost estimations.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--muted-foreground)' }}>Status: Real-time monitoring dashboards and logs will be displayed.</p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Monitoring data unavailable.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {isChatSpaceOpen && <GeminiChatSpace onClose={() => setIsChatSpaceOpen(false)} />}
      </div>
    </div>
  );
};

export default Home;
