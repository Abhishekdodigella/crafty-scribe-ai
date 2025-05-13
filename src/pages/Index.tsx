import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Key } from "lucide-react";

import PromptInput from "@/components/PromptInput";
import StyleSelector from "@/components/StyleSelector";
import GeneratedText from "@/components/GeneratedText";
import ResponseHistory from "@/components/ResponseHistory";
import { generateText, validateApiKey } from "@/lib/openaiApi";
import { WritingStyle, GeneratedResponse, ApiKeyState } from "@/types";

// Define writing styles
const writingStyles: WritingStyle[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clear, formal language suitable for business communications",
    prompt: "Write in a clear, formal tone that would be appropriate for professional business communications. Use precise language, avoid contractions, and maintain a respectful tone.",
  },
  {
    id: "casual",
    name: "Casual",
    description: "Friendly, conversational tone for everyday communication",
    prompt: "Write in a friendly, conversational tone that feels personal and relatable. Use everyday language, contractions, and a warm tone as if speaking to a friend.",
  },
  {
    id: "academic",
    name: "Academic",
    description: "Formal, scholarly writing with technical vocabulary",
    prompt: "Write in a formal, scholarly tone suitable for academic papers or research publications. Use field-appropriate technical vocabulary, complex sentence structures, and evidence-based argumentation.",
  },
  {
    id: "persuasive",
    name: "Persuasive",
    description: "Compelling writing designed to influence the reader",
    prompt: "Write in a compelling, persuasive tone that aims to influence the reader's opinion. Use rhetorical questions, strong arguments, emotional appeals, and calls to action.",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Imaginative language with literary flair",
    prompt: "Write with imaginative and expressive language that showcases literary flair. Use vivid descriptions, metaphors, similes, and varied sentence structures to create engaging content.",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Precise, clear explanations of complex concepts",
    prompt: "Write in a precise, clear style that explains technical concepts effectively. Use industry-specific terminology appropriately, provide clear definitions, and break down complex ideas into understandable parts.",
  },
];

const Index = () => {
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>(writingStyles[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<GeneratedResponse | null>(null);
  const [responses, setResponses] = useState<GeneratedResponse[]>([]);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKeyState, setApiKeyState] = useState<ApiKeyState>({
    key: "",
    isValid: false,
  });
  
  // Check for API key in localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKeyState({
        key: savedApiKey,
        isValid: true,
      });
    } else {
      setApiKeyDialogOpen(true);
    }
  }, []);

  const handleSaveApiKey = async () => {
    try {
      const isValid = await validateApiKey(apiKeyState.key);
      
      if (isValid) {
        localStorage.setItem("openai_api_key", apiKeyState.key);
        setApiKeyState({
          ...apiKeyState,
          isValid: true,
        });
        setApiKeyDialogOpen(false);
        toast.success("Your OpenAI API key has been saved successfully.");
      } else {
        toast.error("Please enter a valid OpenAI API key.");
      }
    } catch (error) {
      toast.error("Failed to validate API key. Please try again.");
    }
  };

  const handleGenerateText = async (prompt: string) => {
    if (!apiKeyState.isValid) {
      setApiKeyDialogOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      const generatedText = await generateText(prompt, selectedStyle, apiKeyState.key);
      
      const newResponse: GeneratedResponse = {
        id: uuidv4(),
        prompt,
        response: generatedText,
        style: selectedStyle,
        timestamp: new Date(),
      };

      setCurrentResponse(newResponse);
      setResponses((prev) => [...prev, newResponse]);
    } catch (error) {
      // Error is handled in the generateText function
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectResponse = (response: GeneratedResponse) => {
    setCurrentResponse(response);
  };

  const handleClearHistory = () => {
    setResponses([]);
    setCurrentResponse(null);
  };

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AI Text Assistant</h1>
        <p className="text-muted-foreground">
          Generate professional text in various styles using AI
        </p>
      </header>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="generate">Generate Text</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <StyleSelector
                styles={writingStyles}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                disabled={isGenerating}
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <PromptInput
                onSubmit={handleGenerateText}
                isLoading={isGenerating}
                placeholder="Enter what you want the AI to write about..."
              />
              
              <GeneratedText
                response={currentResponse}
                isLoading={isGenerating}
              />
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <ResponseHistory
            responses={responses}
            onSelectResponse={handleSelectResponse}
            onClearHistory={handleClearHistory}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">API Settings</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure your OpenAI API access to use this application.
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="mr-2">
                  <div className={`w-3 h-3 rounded-full ${apiKeyState.isValid ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
                <div className="flex-1">
                  <div>API Key Status</div>
                  <div className="text-sm text-muted-foreground">
                    {apiKeyState.isValid ? "Valid key configured" : "No valid key configured"}
                  </div>
                </div>
                <Button
                  onClick={() => setApiKeyDialogOpen(true)}
                  variant="outline"
                >
                  {apiKeyState.isValid ? "Update" : "Set Key"}
                </Button>
              </div>

              <div className="rounded-md bg-muted p-4 mt-6">
                <h3 className="font-medium mb-2">About API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  This app uses the OpenAI API to generate text. You'll need to provide your own 
                  API key, which you can get from the{" "}
                  <a 
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenAI platform
                  </a>.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your API key is stored locally in your browser and is never sent to our servers.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* API Key Dialog */}
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to use the text generation features.
              Your key is stored locally and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <Input
              value={apiKeyState.key}
              onChange={(e) => setApiKeyState({ ...apiKeyState, key: e.target.value })}
              placeholder="sk-..."
              type="password"
              className="font-mono"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setApiKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
