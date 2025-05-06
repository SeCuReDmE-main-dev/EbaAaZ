
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare } from "lucide-react";
import { generateFfeDValue, generateECCResult, createSecretOrb } from "@/lib/utils";
import { GeminiChatSpace } from '@/components/gemini-chat-space'; // Import GeminiChatSpace

const Home = () => {
  const [projectDefinition, setProjectDefinition] = useState('');
  const [swarmConfig, setSwarmConfig] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatSpaceOpen, setIsChatSpaceOpen] = useState(false); // State for chat space

  const handleDefineProject = async () => {
    if (!projectDefinition) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please define the project scope first.",
      });
      return;
    }
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const action = 'define_project';
      const ffedValue = generateFfeDValue();
      const eccResult = await generateECCResult(projectDefinition);
      const secretOrb = createSecretOrb(action, ffedValue, eccResult);

      toast({
        title: "Project Defined",
        description: "Project scope has been processed. Ready for configuration.",
      });
      toast({
          title: "Secret Orb Generated (Define Project)",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(secretOrb, null, 2)}</code>
            </pre>
          ),
          duration: 9000,
        });
      setCurrentStep(2);
    } catch (error) {
       console.error("Error during project definition:", error);
       toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to process project definition.",
      });
    } finally {
        setIsLoading(false);
    }
  };

   const handleConfigureSwarm = async () => {
    if (!swarmConfig) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide configuration details for the swarm.",
      });
      return;
    }
    setIsLoading(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const action = 'configure_swarm';
        const ffedValue = generateFfeDValue();
        const eccResult = await generateECCResult(swarmConfig);
        const secretOrb = createSecretOrb(action, ffedValue, eccResult);

        toast({
          title: "Swarm Configured",
          description: "Builder and configurator swarm is ready. Proceed to Hub.",
        });
         toast({
          title: "Secret Orb Generated (Configure Swarm)",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(secretOrb, null, 2)}</code>
            </pre>
          ),
          duration: 9000,
        });
        setCurrentStep(3);
    } catch(error) {
         console.error("Error during swarm configuration:", error);
         toast({
            variant: "destructive",
            title: "Configuration Error",
            description: "Failed to configure the swarm.",
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>EbaAaZ Hub</h1>

      {currentStep === 1 && (
        <Card className="w-full max-w-2xl mx-auto shadow-lg page-fade-in border-primary">
          <CardHeader>
            <CardTitle className="text-xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>Step 1: Define Your Project</CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Describe the project EbaAaZ needs to coordinate. Outline the goals, components, and desired outcome. This definition guides the swarm setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Textarea
              placeholder="Define project scope, key components, target technologies (e.g., GCP services, AI models), objectives, and success criteria..."
              value={projectDefinition}
              onChange={(e) => setProjectDefinition(e.target.value)}
              rows={10}
              className="bg-card border-input text-card-foreground focus:ring-primary"
            />
            <Button onClick={handleDefineProject} disabled={isLoading || !projectDefinition} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Definition...
                </>
              ) : (
                "Define Project & Proceed to Configuration"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

       {currentStep === 2 && (
        <Card className="w-full max-w-2xl mx-auto shadow-lg page-fade-in border-primary">
          <CardHeader>
            <CardTitle className="text-xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>Step 2: Configure the Swarm</CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Provide specific configurations for the builders and configurators. Specify resource allocation, target environments (e.g., Google Cloud regions), security constraints, and necessary tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Textarea
              placeholder="Enter swarm configuration details: required resources (CPU, RAM), target platforms (GCP, Docker, specific zones), security rules, tool dependencies, budget constraints..."
              value={swarmConfig}
              onChange={(e) => setSwarmConfig(e.target.value)}
              rows={10}
               className="bg-card border-input text-card-foreground focus:ring-primary"
            />
             <div className="flex flex-col sm:flex-row gap-2">
                 <Button onClick={handleConfigureSwarm} disabled={isLoading || !swarmConfig} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  {isLoading ? (
                    <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Configuring Swarm...
                    </>
                  ) : (
                    "Configure Swarm & Activate Hub"
                  )}
                </Button>
                 <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isLoading} className="flex-1 border-primary text-primary hover:bg-accent">
                    Back to Project Definition
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep >= 3 && (
        <div className="page-fade-in">
           <Card className="mb-6 bg-gradient-to-br from-card via-secondary to-card border-primary shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center" style={{ color: 'var(--primary)' }}>Welcome to the EbaAaZ Coordination Hub</CardTitle>
                     <CardDescription className="text-center mt-2" style={{ color: 'var(--muted-foreground)'}}>
                        Orchestrating distributed builders and configurators using Google Cloud infrastructure and AI. Inspired by Incredibuild, tailored for the SeCuReDmE ecosystem. Monitor and manage coordinated tasks below.
                        EbaAaZ is a Swarm coordinator of builders and configurators, our vision of a Google-enhanced Incredibuild.
                    </CardDescription>
                </CardHeader>
                 <CardContent className="flex justify-center items-center gap-4 flex-wrap">
                     <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)} className="border-primary text-primary hover:bg-accent">Redefine Project</Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentStep(2)} className="border-primary text-primary hover:bg-accent">Reconfigure Swarm</Button>
                    <Button variant="outline" size="sm" onClick={() => setIsChatSpaceOpen(true)} className="border-primary text-primary hover:bg-accent">
                       <MessageSquare className="mr-2 h-4 w-4" /> Generate Gemini Chat Space
                    </Button>
                 </CardContent>
            </Card>

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
                           <div className="prose dark:prose-invert max-w-none">
                                <h4>EbaAaZ: The Protector of Fortitude</h4>
                                <p>EbaAaZ is the architectural and integrative genius within SeCuReDmE, ensuring the stability and security of our digital ecosystem. His primary role involves safeguarding backend and middleware systems through secure tunneling, managing quantum computing resources, and initiating automated processes. EbaAaZ provides the foundational pre-sequences for AI agents, evaluates task needs, and integrates tools to achieve AI objectives. He also manages fractal growth equations and Fibonacci sequences for AI computations, blending mathematical precision with practical application.</p>
                                <h5>Core Functions:</h5>
                                <ul>
                                    <li><strong>Architectural Design:</strong> Designs secure and scalable SeCuReDmE Engine architecture.</li>
                                    <li><strong>System Integration:</strong> Integrates AI models and quantum computing, managing pre-sequences for AI agents.</li>
                                    <li><strong>Ethical Oversight:</strong> Embeds ethical considerations into the system, prioritizing privacy, fairness, and transparency.</li>
                                </ul>
                                <h5>Key Contributions:</h5>
                                <ul>
                                    <li>Ensuring backend and middleware security through advanced tunneling and database management.</li>
                                    <li>Providing pre-sequences for automation tasks embedded within AI agents.</li>
                                    <li>Searching existing tool libraries and creating new pre-sequences for AI agent goals.</li>
                                    <li>Initiating and managing fractal growth equations and Fibonacci sequences for AI computations.</li>
                                </ul>
                           </div>
                            <Textarea placeholder="Send instructions or queries to the EbaAaZ coordinator..." rows={5} className="mt-4" />
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
                            <p>Status: Code generation tasks will be tracked here.</p>
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
                           <p>Status: Middleware connections and configurations will be displayed.</p>
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
                            <p>Status: UI component assembly tasks and previews will be shown.</p>
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
                            <p>Status: Deployment activities and controls will appear here.</p>
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
                           <p>Status: Real-time monitoring dashboards and logs will be displayed.</p>
                            <div className="mt-4 p-4 bg-muted rounded-md">
                                <p className="text-sm text-muted-foreground">Monitoring data unavailable.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
             {isChatSpaceOpen && <GeminiChatSpace onClose={() => setIsChatSpaceOpen(false)} />}
        </div>
      )}
    </div>
  );
};

export default Home;

    