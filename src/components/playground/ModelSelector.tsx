
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudProvider, Model } from "@/types/models";
import { toast } from "sonner";
import { Radio } from "lucide-react";

type ModelSelectorProps = {
  onModelSelect: (model: Model) => void;
  selectedModel: Model | null;
};

// Sample model data - in a real app this might come from an API
const AVAILABLE_MODELS: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: CloudProvider.OpenAI,
    description: "Advanced multimodal capabilities for text and vision tasks",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: CloudProvider.OpenAI,
    description: "Efficient version of GPT-4o with balanced performance",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: CloudProvider.Anthropic,
    description: "Anthropic's most powerful model for complex reasoning",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: CloudProvider.Google,
    description: "Google's advanced reasoning and language understanding model",
  },
  {
    id: "llama-3",
    name: "Llama 3 70B",
    provider: CloudProvider.Meta,
    description: "Meta's open model with impressive reasoning capabilities",
  },
];

const ModelSelector = ({ onModelSelect, selectedModel }: ModelSelectorProps) => {
  const [filterProvider, setFilterProvider] = useState<CloudProvider | "all">("all");
  
  const filteredModels = filterProvider === "all" 
    ? AVAILABLE_MODELS 
    : AVAILABLE_MODELS.filter(model => model.provider === filterProvider);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Select Model</CardTitle>
        <CardDescription>Choose from available LLMs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button 
              className={`px-2 py-1 rounded ${filterProvider === "all" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
              onClick={() => setFilterProvider("all")}
            >
              All
            </button>
            {Object.values(CloudProvider).map(provider => (
              <button 
                key={provider}
                className={`px-2 py-1 rounded ${filterProvider === provider ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                onClick={() => setFilterProvider(provider)}
              >
                {provider}
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            {filteredModels.map(model => (
              <div
                key={model.id}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-accent ${
                  selectedModel?.id === model.id ? "border border-primary bg-accent" : ""
                }`}
                onClick={() => onModelSelect(model)}
              >
                <Radio className={`h-4 w-4 ${selectedModel?.id === model.id ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <div className="font-medium text-sm">{model.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="font-medium">{model.provider}</span>
                    <span className="hidden md:inline">• {model.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSelector;
