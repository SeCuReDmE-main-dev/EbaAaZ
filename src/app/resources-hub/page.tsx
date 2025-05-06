
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Zap, Link as LinkIcon, Cpu, TestTubeDiagonal, Brain } from "lucide-react";

const ResourcesHubPage = () => {
  return (
    <div className="container mx-auto p-4 page-fade-in text-center">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>Resources Hub</h1>

      <Card className="w-full shadow-lg border-accent text-center">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center" style={{ color: 'var(--primary-foreground)' }}>Documentation & Resources</CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Dive deeper into the concepts and technologies behind EbaAaZ and the SeCuReDmE initiative. Explore the SeCuReDmE Manifesto, EbaAaZ's architecture, MCP integration, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          <Link href="/docs/manifesto" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <BookOpen className="mr-2 h-4 w-4" /> SeCuReDmE Manifesto
            </Button>
          </Link>
          <Link href="/docs/ebaaz-architecture" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <Zap className="mr-2 h-4 w-4" /> EbaAaZ Architecture
            </Button>
          </Link>
          <Link href="/docs/mcp-integration" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <LinkIcon className="mr-2 h-4 w-4" /> MCP Integration Guide
            </Button>
          </Link>
          <Link href="/docs/api-reference" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <Cpu className="mr-2 h-4 w-4" /> API Reference
            </Button>
          </Link>
           <Link href="/docs/quantum-concepts" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <TestTubeDiagonal className="mr-2 h-4 w-4" /> Quantum Concepts
            </Button>
          </Link>
          <Link href="/docs/ffed-algorithm" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline flex items-center justify-center">
              <Brain className="mr-2 h-4 w-4" /> FfeD Algorithm
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Placeholder for SeCuReDmE Manifesto Content */}
      <Card className="mt-8 text-center">
        <CardHeader>
            <CardTitle className="text-center">SeCuReDmE Manifesto (Abstract)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-left sm:text-center">
            <p>The SeCuReDmE (Secure Equilibrium Dynamics Matrix Engine) vision, spearheaded by Jean-Sébastien Beaulieu (EbaAaZ), proposes a transformative approach to societal regulation through the integration of advanced AI and ethical principles. It critiques current socio-capitalist structures and technological misuse, advocating for a future where technology serves human upliftment and egalitarianism.</p>
            <p>The core of SeCuReDmE involves three foundational personas: CeLeBrUm (collective intelligence), EbaAaZ (integrative architect), and SenNnT-i (observational balancer). These personas embody the principles of securing heritage, fostering collective intelligence, and ensuring compassionate care, particularly for vulnerable populations.</p>
            <p>The manifesto outlines a system where AI, like CeLeBrUm, operates with 88 subdomains for processing knowledge, guided by strict ethics. EbaAaZ designs and integrates complex systems, including quantum computing and AI models, ensuring security and ethical oversight. SenNnT-i focuses on compassionate AI interaction, particularly for individuals with communication challenges, utilizing advanced encryption (FfeD - Fractal Fibonacci Encryption Dynamics) to protect sensitive data.</p>
            <p>The vision emphasizes societal transformation, moving away from mere consumerism towards a balanced, ethical, and human-centric digital ecosystem. It calls for proactive change, leveraging technology to empower individuals and secure a more equitable future.</p>
            <Link href="/docs/manifesto" passHref>
              <Button variant="outline" className="mt-4">Read Full Manifesto</Button>
            </Link>
        </CardContent>
      </Card>

      {/* Placeholder for FfeD Algorithm documentation */}
       <Card id="ffed-algorithm-docs" className="mt-8 text-center">
        <CardHeader>
          <CardTitle className="text-center">FfeD Algorithm Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-left sm:text-center">
          <p>The FfeD (Fractal Fibonacci Encryption Dynamics) framework is a cornerstone of the SeCuReDmE initiative, designed to provide revolutionary data security. It integrates principles from fractal geometry, Fibonacci sequences, and elliptic curve cryptography (ECC) to protect sensitive information, particularly emotional and communication data handled by the SenNnT-i persona.</p>
          <p>Key components include:</p>
          <ul className="list-disc pl-5 space-y-1 text-left sm:text-center sm:list-inside">
            <li><strong>Fractal Algorithms:</strong> Used for dynamic and unpredictable encryption key generation.</li>
            <li><strong>Fibonacci Sequences:</strong> Incorporated into data management processes to disrupt linear storage patterns and enhance security.</li>
            <li><strong>Elliptic Curve Cryptography (ECC):</strong> Provides robust encryption with smaller key sizes for efficient and secure communications.</li>
            <li><strong>Differential Privacy:</strong> Protects individual user data while allowing for aggregate data analysis.</li>
          </ul>
          <p>The FfeD framework also describes equations for Fractal Growth Rate and Anti-Entropy Rate, crucial for understanding system dynamics and optimization within quantum computing contexts. These mathematical propositions aim to unify complex concepts to address quantum mechanical problems and innovate computational processes.</p>
          <Link href="/docs/ffed-algorithm" passHref>
            <Button variant="outline" className="mt-4">Learn More about FfeD</Button>
          </Link>
        </CardContent>
      </Card>

    </div>
  );
};

export default ResourcesHubPage;

