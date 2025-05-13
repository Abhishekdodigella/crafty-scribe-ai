
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash2 } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const PromptInput = ({ onSubmit, isLoading, placeholder = "Enter your text prompt here..." }: PromptInputProps) => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const clearPrompt = () => {
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <Textarea
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-y p-4 text-base focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        {prompt.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearPrompt}
            className="absolute right-2 top-2"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || prompt.trim().length === 0}>
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Generating...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default PromptInput;
