"use client";

import {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useToast} from "@/hooks/use-toast";
import {Copy, Loader2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {generatePodcastSummary} from "@/ai/flows/podcast-summary";
import {graftToCode} from "@/ai/flows/graft-to-code-conversion";

const Home = () => {
  const [dataInput, setDataInput] = useState('');
  const [graftInput, setGraftInput] = useState('');
  const [codeline, setCodeline] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [podcastSummary, setPodcastSummary] = useState('');
  const {toast} = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  const handleDataLoad = async () => {
    setIsLoadingSummary(true);
    try {
      const result = await generatePodcastSummary({data: dataInput});
      setPodcastSummary(result.podcastSummary);
      toast({
        title: "Podcast summary generated!",
        description: "Summary has been generated from loaded data.",
      });
      setCurrentStep(2); // Move to the next step after generating summary
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate podcast summary.",
      });
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleGraftToCode = async () => {
    setIsLoadingCode(true);
    try {
      const result = await graftToCode({graft: graftInput});
      setCodeline(result.codeline);
      toast({
        title: "Code generated!",
        description: "Codeline has been generated from the input graft.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate codeline.",
      });
    } finally {
      setIsLoadingCode(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(codeline);
    toast({
      title: "Copied to clipboard!",
      description: "The generated code has been copied to your clipboard.",
    });
  };

  const handleUploadSource = () => {
    setCurrentStep(2); // Move to the next step after uploading source
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold glow">EbaAaZ - Core Features</h1>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Add a source to get started</CardTitle>
            <CardDescription>Upload your data source to begin.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Textarea
              placeholder="Upload your data source here..."
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
            />
            <Button onClick={handleUploadSource}>
              Upload a source
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep >= 2 && (
        <Tabs defaultValue="data-load">
          <TabsList className="mb-4">
            <TabsTrigger value="data-load" className="tab-label">Data Load &amp; Podcast</TabsTrigger>
            <TabsTrigger value="input-capture" className="tab-label">Input Capture</TabsTrigger>
            <TabsTrigger value="codeline-display" className="tab-label">Codeline Display</TabsTrigger>
            <TabsTrigger value="workbook-interface" className="tab-label">Workbook Interface</TabsTrigger>
            <TabsTrigger value="code-creation" className="tab-label">Code Creation</TabsTrigger>
            <TabsTrigger value="middleware" className="tab-label">Middleware</TabsTrigger>
            <TabsTrigger value="fluffer-front-end" className="tab-label">Fluffer Front-End</TabsTrigger>
          </TabsList>

          <TabsContent value="data-load" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Data Load &amp; Podcast</CardTitle>
                <CardDescription>Load data, chat, and cast a podcast about the data.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Textarea
                  placeholder="Load your data here..."
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                />
                <Button onClick={handleDataLoad} disabled={isLoadingSummary}>
                  {isLoadingSummary ? (
                    <>
                      Generating Summary <Loader2 className="ml-2 h-4 w-4 animate-spin"/>
                    </>
                  ) : (
                    "Generate Podcast Summary"
                  )}
                </Button>
                {podcastSummary && (
                  <Textarea
                    readOnly
                    value={podcastSummary}
                    className="mt-2"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="input-capture" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Input Capture</CardTitle>
                <CardDescription>Accept user input of classgraft and flowgraft.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Textarea
                  placeholder="Enter your classgraft and flowgraft here..."
                  value={graftInput}
                  onChange={(e) => setGraftInput(e.target.value)}
                />
                <Button onClick={handleGraftToCode} disabled={isLoadingCode}>
                  {isLoadingCode ? (
                    <>
                      Generating Codeline <Loader2 className="ml-2 h-4 w-4 animate-spin"/>
                    </>
                  ) : (
                    "Transform Graft to Codeline"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codeline-display" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Codeline Display</CardTitle>
                <CardDescription>Display the generated codeline.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {codeline ? (
                  <div className="relative">
                    <Textarea
                      readOnly
                      value={codeline}
                      className="mb-4"
                    />
                    <Button
                      onClick={handleCopyToClipboard}
                      className="absolute top-2 right-2"
                    >
                      <Copy className="h-4 w-4 mr-2"/>
                      Copy to Clipboard
                    </Button>
                  </div>
                ) : (
                  <p>No codeline generated yet. Please input graft data.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workbook-interface" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Workbook Interface</CardTitle>
                <CardDescription>Ask/brainstorm/revise with the coordinator.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This feature is under development.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code-creation" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Code Creation</CardTitle>
                <CardDescription>Direct link to an idx repo with the code structure and options to copy the generated code.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This feature is under development.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="middleware" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Middleware</CardTitle>
                <CardDescription>Coordinator manipulating Google ADK and building AUTOGEN bot.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This feature is under development.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fluffer-front-end" className="outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Fluffer Front-End</CardTitle>
                <CardDescription>Drag and drop/slide/edit/move/combine UI elements.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This feature is under development.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Home;
