"use client";

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, BookOpen, Settings, FileCog, UploadCloud, Play, Save, UserCircle, Bell } from "lucide-react";
import { EbaazChatSpace } from '@/components/ebaaz-chat-space';
import { useToast } from "@/hooks/use-toast";

const BrainstormHubPage = () => {
  const [showEbaazChat, setShowEbaazChat] = useState(false);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("EbaAaZ User");
  const [darkMode, setDarkMode] = useState(true);
  const [numWorkers, setNumWorkers] = useState(8);
  const [advancedLogging, setAdvancedLogging] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notificationChannel, setNotificationChannel] = useState("email");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentFileName, setDocumentFileName] = useState<string>("");
  const [isProcessingDocument, setIsProcessingDocument] = useState<boolean>(false);

  const handleSaveChanges = () => {
    console.log("Settings saved:", {
      displayName,
      darkMode,
      numWorkers,
      advancedLogging,
      emailNotifications,
      notificationChannel,
    });
    toast({
      title: "Settings Saved",
      description: "Your configurations have been updated successfully.",
      variant: "default",
    });
  };

  const handleDocumentFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".pdf") || file.name.endsWith(".txt") || file.name.endsWith(".json")) {
        setDocumentFile(file);
        setDocumentFileName(file.name);
        toast({
          title: "File Selected",
          description: `${file.name} is ready to be processed.`,
        });
      } else {
        setDocumentFile(null);
        setDocumentFileName("");
        toast({
          title: "Invalid File Type",
          description: "Please select a .pdf, .txt, or .json file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleProcessDocumentFile = async () => {
    if (!documentFile) {
      toast({
        title: "No File Selected",
        description: "Please select a document file to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingDocument(true);
    toast({
      title: "Processing Document File",
      description: `Processing ${documentFile.name}...`,
    });

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      // In a real scenario, you would call an AI flow here, e.g.:
      // const documentContent = await documentFile.text();
      // const result = await processDocumentFlow({ documentContent }); // Assuming such a flow exists
      // console.log("Document processing result:", result);
      toast({
        title: "Document File Processed",
        description: `${documentFile.name} has been processed successfully. (Simulated)`,
        variant: "default", 
      });
    } catch (error) {
      console.error("Error processing document file:", error);
      toast({
        title: "Error Processing Document File",
        description: `An error occurred while processing ${documentFile.name}. Check console for details.`,
        variant: "destructive",
      });
    } finally {
      setIsProcessingDocument(false);
    }
  };

  const handleOpenEbaazChat = () => {
    const currentSettingsSummary = `Display Name: ${displayName}, Dark Mode: ${darkMode}, Workers: ${numWorkers}, Logging: ${advancedLogging}, Notifications: ${emailNotifications} via ${notificationChannel}. Document File: ${documentFileName || 'None'}.`;
    const context = `User is on the EbaAaZ Brainstorm Hub page.
    Project: EbaAaZ - The Protector of Fortitude, an application for configuration and integration hub powered by SeCuReDmE.
    Current User: ${displayName}
    Current Page Configurations: ${currentSettingsSummary}
    The user is configuring their EbaAaZ experience, including user profile, swarm configuration, notification settings, and document loading.`;
    setChatContext(context);
    setShowEbaazChat(true);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6 page-fade-in text-center">
       <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
         EbaAaZ Brainstorm Hub
      </h1>

      <Card className="w-full max-w-3xl shadow-lg border-primary text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Welcome to the Brainstorm Hub
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
            Configure your EbaAaZ experience, manage swarm settings, and define role-based permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <p>
            This is your central space for tailoring EbaAaZ to your needs. Adjust your profile, set up notification preferences,
            configure how the AI swarm operates, and manage access control through document files.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
        <Button onClick={handleOpenEbaazChat} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <MessageSquare className="mr-2 h-5 w-5" /> Open EbaAaZ Chat
        </Button>
        <Link href="/resources-hub" passHref>
          <Button variant="outline">
            <BookOpen className="mr-2 h-5 w-5" /> Explore Resources Hub
          </Button>
        </Link>
      </div>
      
      {showEbaazChat && <EbaazChatSpace context={chatContext} onClose={() => setShowEbaazChat(false)} />}

      <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--primary)' }}>
        Hub Configuration
      </h2>

      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Configure Your EbaAaZ Experience
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage your preferences for the EbaAaZ Brainstorm Hub and swarm coordination.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* User Profile Settings */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <UserCircle className="mr-2 h-6 w-6" /> User Profile
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="displayName" className="text-sm font-medium text-left block mb-1">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  className="bg-card border-input text-card-foreground focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode" className="text-sm font-medium">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                />
              </div>
            </div>
          </section>

          {/* Swarm Configuration Settings */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <Settings className="mr-2 h-6 w-6" /> Swarm Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="numWorkers" className="text-sm font-medium text-left block mb-1">Default Number of Workers</Label>
                <Input
                  id="numWorkers"
                  type="number"
                  value={numWorkers}
                  onChange={(e) => setNumWorkers(parseInt(e.target.value, 10))}
                  min="1"
                  className="bg-card border-input text-card-foreground focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="advancedLogging" className="text-sm font-medium">Enable Advanced Logging</Label>
                <Switch
                  id="advancedLogging"
                  checked={advancedLogging}
                  onCheckedChange={setAdvancedLogging}
                  aria-label="Toggle advanced logging"
                />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <Bell className="mr-2 h-6 w-6" /> Notification Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="text-sm font-medium">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  aria-label="Toggle email notifications"
                />
              </div>
              <div>
                <Label htmlFor="notificationChannel" className="text-sm font-medium text-left block mb-1">Preferred Notification Channel</Label>
                <Select value={notificationChannel} onValueChange={setNotificationChannel}>
                  <SelectTrigger id="notificationChannel" className="w-full bg-card border-input text-card-foreground focus:ring-primary text-left">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="in-app">In-App Messages</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Document Loading */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <FileCog className="mr-2 h-6 w-6" /> Document Loading
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="documentFileInput" className="text-sm font-medium text-left block mb-1">
                  Upload Document File (.pdf, .txt, .json)
                </Label>
                <Input
                  id="documentFileInput"
                  type="file"
                  accept=".pdf,.txt,.json"
                  onChange={handleDocumentFileChange}
                  className="bg-card border-input text-card-foreground focus:ring-primary file:text-primary file:font-semibold"
                />
                {documentFileName && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">Selected file: {documentFileName}</p>
                )}
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={handleProcessDocumentFile} 
                  disabled={!documentFile || isProcessingDocument}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isProcessingDocument ? (
                    <UploadCloud className="mr-2 h-5 w-5 animate-pulse" />
                  ) : (
                    <Play className="mr-2 h-5 w-5" />
                  )}
                  {isProcessingDocument ? "Processing..." : "Process Document File"}
                </Button>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="mr-2 h-5 w-5" /> Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workbook Interface Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Workbook Interface
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage workbook interface settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your workbook interface settings here */}
        </CardContent>
      </Card>

      {/* Public Website URL Loading Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Public Website URL Loading
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage public website URL loading settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your public website URL loading settings here */}
        </CardContent>
      </Card>

      {/* Google Drive Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Google Drive
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage Google Drive settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your Google Drive settings here */}
        </CardContent>
      </Card>

      {/* Microsoft Cloud Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Microsoft Cloud
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage Microsoft Cloud settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your Microsoft Cloud settings here */}
        </CardContent>
      </Card>

      {/* Brainstorming with EbaAaZ Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Brainstorming with EbaAaZ
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage brainstorming settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your brainstorming settings here */}
        </CardContent>
      </Card>

      {/* Podcast Creation Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Podcast Creation
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage podcast creation settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your podcast creation settings here */}
        </CardContent>
      </Card>

    </div>
  );
};

export default BrainstormHubPage;
