
import { useState } from "react";
import { GeneratedResponse } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

interface ResponseHistoryProps {
  responses: GeneratedResponse[];
  onSelectResponse: (response: GeneratedResponse) => void;
  onClearHistory: () => void;
}

const ResponseHistory = ({ 
  responses, 
  onSelectResponse, 
  onClearHistory 
}: ResponseHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (responses.length === 0) return null;

  return (
    <div className="w-full rounded-md border">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <h3 className="font-medium">Response History</h3>
          <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 ml-2">
            {responses.length}
          </span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onClearHistory();
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear history</span>
          </Button>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      
      {isOpen && (
        <>
          <Separator />
          <ScrollArea className="max-h-72">
            <div className="p-4 space-y-2">
              {responses.slice().reverse().map((response) => (
                <div
                  key={response.id}
                  className="p-3 rounded-md hover:bg-secondary cursor-pointer"
                  onClick={() => onSelectResponse(response)}
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium line-clamp-1">{response.prompt}</div>
                    <div className="text-xs text-muted-foreground ml-2">
                      {new Date(response.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Style: {response.style.name}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default ResponseHistory;
