"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationBar } from "@/components/tabs/NavigationBar";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const handleSave = () => {
    console.log("Settings saved:", { name, email, darkMode, notifications });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar />
      <main className="container mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gray-900 border-gray-800 ">
              <CardHeader>
                <CardTitle
                className="text-gray-200"
                >Profile Settings</CardTitle>
                <CardDescription>
                  Manage your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt="Profile picture"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Picture</Button>
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-200" >Name</Label>
                  <Input
                    id="name"
                    value={name}

                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-gray-200">
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" 
                  className={`${darkMode ? "text-gray-200" : "text-gray-400"}`}
                  >Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" 
                  className={`${darkMode ? "text-gray-200" : "text-gray-400"}`}
                  
                  >Notifications</Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-gray-900 border-gray-800 ">
              <CardHeader>
                <CardTitle
                className={`${darkMode ? "text-gray-200" : "text-gray-400"}`}
                >Account Management</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-400"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button
            onClick={handleSave}
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
          >
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}
