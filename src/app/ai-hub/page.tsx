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
import UserFeedback from '@/components/user-feedback';

const AIHubPage = () => {
  const [showEbaazChat, setShowEbaazChat] = useState(false);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("EbaAaZ User");
  const [darkMode, setDarkMode] = useState(true);
  const [numWorkers, setNumWorkers] = useState(8);
  const [advancedLogging, setAdvancedLogging] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notificationChannel, setNotificationChannel] = useState("email");

  const [graftFile, setGraftFile] = useState<File | null>(null);
  const [graftFileName, setGraftFileName] = useState<string>("");
  const [isProcessingGraft, setIsProcessingGraft] = useState<boolean>(false);

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

  const handleGraftFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".yml") || file.name.endsWith(".yaml")) {
        setGraftFile(file);
        setGraftFileName(file.name);
        toast({
          title: "File Selected",
          description: `${file.name} is ready to be processed.`,
        });
      } else {
        setGraftFile(null);
        setGraftFileName("");
        toast({
          title: "Invalid File Type",
          description: "Please select a .yml or .yaml file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleProcessGraftFile = async () => {
    if (!graftFile) {
      toast({
        title: "No File Selected",
        description: "Please select a graft file to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingGraft(true);
    toast({
      title: "Processing Graft File",
      description: `Processing ${graftFile.name}...`,
    });

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      // In a real scenario, you would call an AI flow here, e.g.:
      // const graftContent = await graftFile.text();
      // const result = await processGraftFlow({ graftContent }); // Assuming such a flow exists
      // console.log("Graft processing result:", result);
      toast({
        title: "Graft File Processed",
        description: `${graftFile.name} has been processed successfully. (Simulated)`,
        variant: "default", 
      });
    } catch (error) {
      console.error("Error processing graft file:", error);
      toast({
        title: "Error Processing Graft File",
        description: `An error occurred while processing ${graftFile.name}. Check console for details.`,
        variant: "destructive",
      });
    } finally {
      setIsProcessingGraft(false);
    }
  };

  const handleOpenEbaazChat = () => {
    const currentSettingsSummary = `Display Name: ${displayName}, Dark Mode: ${darkMode}, Workers: ${numWorkers}, Logging: ${advancedLogging}, Notifications: ${emailNotifications} via ${notificationChannel}. Graft File: ${graftFileName || 'None'}.`;
    const context = `User is on the EbaAaZ AI Hub page.
    Project: EbaAaZ - The Protector of Fortitude, an application for configuration and integration hub powered by SeCuReDmE.
    Current User: ${displayName}
    Current Page Configurations: ${currentSettingsSummary}
    The user is configuring their EbaAaZ experience, including user profile, swarm configuration, notification settings, and role/permission graft configurations.`;
    setChatContext(context);
    setShowEbaazChat(true);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6 page-fade-in text-center">
       <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
         EbaAaZ AI Hub
      </h1>

      <Card className="w-full max-w-3xl shadow-lg border-primary text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Welcome to the AI Hub
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
            Configure your EbaAaZ experience, manage swarm settings, and define role-based permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <p>
            This is your central space for tailoring EbaAaZ to your needs. Adjust your profile, set up notification preferences,
            configure how the AI swarm operates, and manage access control through graft files.
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
            Manage your preferences for the EbaAaZ AI Hub and swarm coordination.
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

          {/* Role & Permission Graft Configuration */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <FileCog className="mr-2 h-6 w-6" /> Role & Permission Graft Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="graftFileInput" className="text-sm font-medium text-left block mb-1">
                  Upload Graft File (.yml, .yaml)
                </Label>
                <Input
                  id="graftFileInput"
                  type="file"
                  accept=".yml,.yaml"
                  onChange={handleGraftFileChange}
                  className="bg-card border-input text-card-foreground focus:ring-primary file:text-primary file:font-semibold"
                />
                {graftFileName && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">Selected file: {graftFileName}</p>
                )}
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={handleProcessGraftFile} 
                  disabled={!graftFile || isProcessingGraft}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isProcessingGraft ? (
                    <UploadCloud className="mr-2 h-5 w-5 animate-pulse" />
                  ) : (
                    <Play className="mr-2 h-5 w-5" />
                  )}
                  {isProcessingGraft ? "Processing..." : "Process Graft File"}
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

      {/* Persona Configuration Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Persona Configuration
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage persona settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your persona configuration settings here */}
        </CardContent>
      </Card>

      {/* Class Configuration Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Class Configuration
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage class settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your class configuration settings here */}
        </CardContent>
      </Card>

      {/* Third-Party Configuration Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Third-Party Configuration
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage third-party settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your third-party configuration settings here */}
        </CardContent>
      </Card>

      {/* Google Drive Tool Connection Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Google Drive Tool Connection
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage Google Drive tool connections for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your Google Drive tool connection settings here */}
        </CardContent>
      </Card>

      {/* Google Lab Anchor Section */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Google Lab Anchor
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage Google Lab anchor settings for EbaAaZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add your Google Lab anchor settings here */}
        </CardContent>
      </Card>

      {/* User Feedback Section */}
      <UserFeedback />

    </div>
  );
};

export default AIHubPage;
