
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const cardioData = [
  { date: "Jan 1", distance: 2.1, pace: 10.2, heartRate: 152 },
  { date: "Jan 8", distance: 2.3, pace: 9.8, heartRate: 149 },
  { date: "Jan 15", distance: 2.5, pace: 9.7, heartRate: 148 },
  { date: "Jan 22", distance: 2.8, pace: 9.5, heartRate: 146 },
  { date: "Jan 29", distance: 3.1, pace: 9.3, heartRate: 145 },
  { date: "Feb 5", distance: 3.4, pace: 9.1, heartRate: 143 },
  { date: "Feb 12", distance: 3.7, pace: 8.9, heartRate: 142 },
];

interface CardioProgressChartProps {
  timeRange: string;
}

const CardioProgressChart = ({ timeRange }: CardioProgressChartProps) => {
  const chartConfig = {
    distance: { theme: { light: "#3B82F6", dark: "#3B82F6" }, label: "Distance (miles)" },
    pace: { theme: { light: "#EF4444", dark: "#EF4444" }, label: "Pace (min/mile)" },
    heartRate: { theme: { light: "#F59E0B", dark: "#F59E0B" }, label: "Heart Rate (bpm)" },
  };
  
  // In a real app, we would filter data based on timeRange
  // For this example, we're using static data
  
  return (
    <ChartContainer
      className="h-[350px]"
      config={chartConfig}
    >
      <LineChart
        data={cardioData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="distance"
          stroke="var(--color-distance)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="pace"
          stroke="var(--color-pace)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="var(--color-heartRate)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          yAxisId={1}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default CardioProgressChart;
