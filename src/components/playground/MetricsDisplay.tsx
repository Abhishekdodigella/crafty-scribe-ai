
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Dices, DollarSign } from "lucide-react";

type Metrics = {
  latency: number;
  tokenCount: number;
  cost: number;
};

type MetricsDisplayProps = {
  metrics: Metrics;
  isVisible: boolean;
};

const MetricsDisplay = ({ metrics, isVisible }: MetricsDisplayProps) => {
  if (!isVisible) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Request Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">{metrics.latency}</span>
            <span className="text-xs text-muted-foreground">ms latency</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <Dices className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">{metrics.tokenCount}</span>
            <span className="text-xs text-muted-foreground">tokens</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <DollarSign className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">
              ${metrics.cost.toFixed(5)}
            </span>
            <span className="text-xs text-muted-foreground">estimated cost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsDisplay;
