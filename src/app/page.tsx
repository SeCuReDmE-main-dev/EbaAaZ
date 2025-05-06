
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, UserCircle, Settings2, Bell } from "lucide-react";

const HumanHubSettingsPage = () => {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("EbaAaZ User");
  const [darkMode, setDarkMode] = useState(true); // Assuming dark mode is default from globals.css
  const [numWorkers, setNumWorkers] = useState(8);
  const [advancedLogging, setAdvancedLogging] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notificationChannel, setNotificationChannel] = useState("email");

  const handleSaveChanges = () => {
    // Placeholder for actual save logic
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

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6 page-fade-in text-center">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>
        Human Hub Configuration
      </h1>

      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
            Configure Your EbaAaZ Experience
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
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

          <div className="flex justify-center mt-8">
            <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="mr-2 h-5 w-5" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HumanHubSettingsPage;

    