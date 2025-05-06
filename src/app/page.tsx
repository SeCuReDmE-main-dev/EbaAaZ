"use client";

import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, UserCircle, Settings2, Bell, FileCog, UploadCloud, Play } from "lucide-react";

const HumanHubSettingsPage = () => {
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

    // Placeholder for actual graft file processing logic
    // This could involve reading the file content, parsing YAML,
    // and interacting with a backend or Genkit flow.
    try {
      // const fileContent = await graftFile.text();
      // console.log("Graft file content:", fileContent);
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Example: Simulate a call to a Genkit flow
      // const result = await processGraftFlow({fileName: graftFile.name, content: fileContent });
      // console.log("Graft processing result:", result);

      toast({
        title: "Graft File Processed",
        description: `${graftFile.name} has been processed successfully. (Simulated)`,
        variant: "default",
      });
      // Reset file input after successful processing if needed
      // setGraftFile(null);
      // setGraftFileName("");
      // const fileInput = document.getElementById('graftFileInput') as HTMLInputElement;
      // if (fileInput) fileInput.value = "";

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


  return (
    <div className="container mx-auto p-4 flex flex-col gap-6 page-fade-in text-center">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>
        Human Hub Settings
      </h1>

      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Configure Your EbaAaZ Experience
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
            Manage your preferences for the EbaAaZ Human Hub and swarm coordination.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* User Profile Settings */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <UserCircle className="mr-2 h-6 w-6" /> User Profile
            </h2>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <Settings2 className="mr-2 h-6 w-6" /> Swarm Configuration
            </h2>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <Bell className="mr-2 h-6 w-6" /> Notification Settings
            </h2>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center" style={{ color: 'var(--secondary-foreground)' }}>
              <FileCog className="mr-2 h-6 w-6" /> Role & Permission Graft Configuration
            </h2>
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
    </div>
  );
};

export default HumanHubSettingsPage;