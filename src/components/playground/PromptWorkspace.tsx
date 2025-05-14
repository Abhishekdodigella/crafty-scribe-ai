
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader, SendHorizonal, RefreshCw, Plus } from "lucide-react";
import { useState } from "react";

type PromptWorkspaceProps = {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onPromptSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
};

const PROMPT_TEMPLATES = [
  {
    name: "Default",
    template: "Please provide information about:",
  },
  {
    name: "Explain Concept",
    template: "Explain the following concept in simple terms:\n\n[Concept]",
  },
  {
    name: "Compare and Contrast",
    template: "Compare and contrast the following:\n\n1. [Item 1]\n2. [Item 2]",
  },
  {
    name: "Academic Analysis",
    template: "Provide an academic analysis of the following topic:\n\n[Topic]",
  },
];

const PromptWorkspace = ({
  prompt,
  onPromptChange,
  onPromptSubmit,
  onClear,
  isLoading,
}: PromptWorkspaceProps) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const applyTemplate = (template: string) => {
    onPromptChange(template);
    setShowTemplates(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Prompt</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <Plus className="h-4 w-4 mr-1" /> Templates
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {showTemplates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {PROMPT_TEMPLATES.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => applyTemplate(template.template)}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-xs">
                    {template.template.substring(0, 40)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}

        <Textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Enter your prompt here..."
          className="min-h-[200px] resize-none"
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClear} disabled={isLoading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button onClick={onPromptSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <SendHorizonal className="h-4 w-4 mr-2" />
              Run
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptWorkspace;
