
import { useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { GeneratedResponse } from "@/types";

interface GeneratedTextProps {
  response: GeneratedResponse | null;
  isLoading: boolean;
}

const LoadingState = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <div className="h-4 w-48 bg-muted animate-pulse-slow rounded"></div>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="h-4 w-full bg-muted animate-pulse-slow rounded"></div>
      <div className="h-4 w-[95%] bg-muted animate-pulse-slow rounded"></div>
      <div className="h-4 w-[90%] bg-muted animate-pulse-slow rounded"></div>
      <div className="h-4 w-full bg-muted animate-pulse-slow rounded"></div>
      <div className="h-4 w-[85%] bg-muted animate-pulse-slow rounded"></div>
    </CardContent>
  </Card>
);

const GeneratedText = ({ response, isLoading }: GeneratedTextProps) => {
  const [copied, setCopied] = useState(false);

  if (isLoading) return <LoadingState />;
  if (!response) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(response.response);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The generated text has been copied to your clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: "Feedback received",
      description: `Thank you for your ${isPositive ? "positive" : "negative"} feedback!`,
    });
  };

  return (
    <Card className="fade-in w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div>Generated with {response.style.name}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(response.timestamp).toLocaleString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {response.response.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index} className="my-2">{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback(true)}
            className="text-xs"
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            Helpful
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback(false)}
            className="text-xs"
          >
            <ThumbsDown className="h-3 w-3 mr-1" />
            Not helpful
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneratedText;
