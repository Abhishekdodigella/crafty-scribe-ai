
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Loader } from "lucide-react";
import { toast } from "sonner";

type ResultDisplayProps = {
  response: string;
  isLoading: boolean;
};

const ResultDisplay = ({ response, isLoading }: ResultDisplayProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard");
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Response</CardTitle>
        {response && (
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-1" /> Copy
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Processing your request...</p>
            </div>
          </div>
        ) : response ? (
          <div className="min-h-[200px] p-4 bg-muted rounded-md whitespace-pre-wrap">
            {response}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[200px] text-muted-foreground">
            Response will appear here
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
