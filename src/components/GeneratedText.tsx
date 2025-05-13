
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Copy } from "lucide-react";
import { GeneratedResponse } from "@/types";

interface GeneratedTextProps {
  response: GeneratedResponse | null;
  isLoading: boolean;
}

const GeneratedText: React.FC<GeneratedTextProps> = ({ response, isLoading }) => {
  const handleCopy = () => {
    if (!response) return;
    
    navigator.clipboard.writeText(response.response)
      .then(() => {
        toast.success({
          title: "Copied to clipboard",
          description: "The generated text has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast.error({
          title: "Copy failed",
          description: "Could not copy to clipboard. Please try again.",
        });
      });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h2 className="font-semibold text-lg mb-2">Generated Text</h2>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : response ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {response.response.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Enter a prompt and select a writing style to generate text
          </p>
        )}
      </CardContent>

      {response && !isLoading && (
        <CardFooter className="bg-muted/40 p-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1" 
            onClick={handleCopy}
          >
            <Copy size={16} /> Copy text
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GeneratedText;
