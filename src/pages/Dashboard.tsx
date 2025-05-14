
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelSelector from "@/components/playground/ModelSelector";
import PromptWorkspace from "@/components/playground/PromptWorkspace";
import ResultDisplay from "@/components/playground/ResultDisplay";
import ResearchTools from "@/components/playground/ResearchTools";
import MetricsDisplay from "@/components/playground/MetricsDisplay";
import { toast } from "sonner";
import { CloudProvider, Model } from "@/types/models";
import { useLocalStorage } from "@/hooks/use-local-storage";

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage<string>("cloud_api_key", "");
  const [metrics, setMetrics] = useState({
    latency: 0,
    tokenCount: 0,
    cost: 0,
  });

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    toast.success(`Selected model: ${model.name}`);
  };

  const handlePromptSubmit = async () => {
    if (!selectedModel) {
      toast.error("Please select a model first");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!apiKey) {
      toast.error("API key not configured. Please set up your API key in settings.");
      return;
    }

    setIsLoading(true);
    const startTime = performance.now();

    try {
      // In a real app, we would call the actual API here
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse = `This is a simulated response from ${selectedModel.name} (${selectedModel.provider}).\n\nYour prompt was: "${prompt}"\n\nThe model would process this and return a relevant response. In a production environment, this would connect to the actual API endpoints.`;
      
      setResponse(mockResponse);
      
      const endTime = performance.now();
      setMetrics({
        latency: Math.round(endTime - startTime),
        tokenCount: Math.round(prompt.split(" ").length * 1.3),
        cost: (prompt.split(" ").length * 0.00002),
      });
      
      toast.success("Response generated successfully");
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearWorkspace = () => {
    setPrompt("");
    setResponse("");
    toast.info("Workspace cleared");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">LLM Playground</h1>
      
      <Tabs defaultValue="playground" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 w-full md:w-1/2">
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="research">Research & Fine-tuning</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playground" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <ModelSelector onModelSelect={handleModelSelect} selectedModel={selectedModel} />
            </div>
            
            <div className="md:col-span-3 space-y-6">
              <PromptWorkspace 
                prompt={prompt}
                onPromptChange={setPrompt}
                onPromptSubmit={handlePromptSubmit}
                onClear={handleClearWorkspace}
                isLoading={isLoading}
              />
              
              <ResultDisplay response={response} isLoading={isLoading} />
              
              <MetricsDisplay metrics={metrics} isVisible={!!response} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="research">
          <ResearchTools />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="border rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-4">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Detailed usage analytics and model performance metrics will be shown here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
