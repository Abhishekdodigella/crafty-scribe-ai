
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Key, Database, User } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const SettingsPage = () => {
  const [apiKeys, setApiKeys] = useLocalStorage<Record<string, string>>('api_keys', {});
  
  const handleSaveKey = (provider: string, key: string) => {
    const newApiKeys = { ...apiKeys, [provider]: key };
    setApiKeys(newApiKeys);
    toast.success(`${provider} API key saved`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Key className="h-5 w-5" /> API Keys Configuration
              </CardTitle>
              <CardDescription>
                Configure your API keys for different model providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <APIKeyForm 
                provider="OpenAI"
                value={apiKeys.OpenAI || ''}
                onSave={(key) => handleSaveKey('OpenAI', key)}
              />
              
              <APIKeyForm 
                provider="Anthropic"
                value={apiKeys.Anthropic || ''}
                onSave={(key) => handleSaveKey('Anthropic', key)}
              />
              
              <APIKeyForm 
                provider="Google AI"
                value={apiKeys.Google || ''}
                onSave={(key) => handleSaveKey('Google', key)}
              />
              
              <APIKeyForm 
                provider="Azure OpenAI"
                value={apiKeys.Azure || ''}
                onSave={(key) => handleSaveKey('Azure', key)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" /> Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value="Demo User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value="demo@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select id="role" className="w-full p-2 border rounded-md" defaultValue="researcher">
                  <option value="researcher">Researcher</option>
                  <option value="developer">Developer</option>
                  <option value="student">Student</option>
                </select>
              </div>
              
              <Button>Update Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Track model usage and performance metrics
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark mode preference
                  </p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-save Prompts</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically save prompts to history
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// API Key Form Component
const APIKeyForm = ({ 
  provider, 
  value, 
  onSave 
}: { 
  provider: string; 
  value: string; 
  onSave: (key: string) => void 
}) => {
  const [key, setKey] = useState(value);
  const [isEditing, setIsEditing] = useState(!value);
  
  const handleSave = () => {
    onSave(key);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2 pb-6 border-b last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <Label>{provider}</Label>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            {value ? "Edit" : "Add"}
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex gap-2">
          <Input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={`Enter your ${provider} API key`}
            className="font-mono"
          />
          <Button onClick={handleSave} disabled={!key}>Save</Button>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          {value ? "●●●●●●●●●●●●●●●●●●●●" : "No API key configured"}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
