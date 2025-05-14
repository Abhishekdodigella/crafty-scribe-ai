
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

const exerciseData = [
  { date: "Jan 1", squat: 185, deadlift: 225, benchPress: 135 },
  { date: "Jan 7", squat: 190, deadlift: 230, benchPress: 140 },
  { date: "Jan 14", squat: 195, deadlift: 235, benchPress: 145 },
  { date: "Jan 21", squat: 200, deadlift: 245, benchPress: 150 },
  { date: "Jan 28", squat: 205, deadlift: 255, benchPress: 155 },
  { date: "Feb 4", squat: 215, deadlift: 265, benchPress: 165 },
  { date: "Feb 11", squat: 225, deadlift: 275, benchPress: 170 },
];

interface StrengthProgressChartProps {
  timeRange: string;
}

const StrengthProgressChart = ({ timeRange }: StrengthProgressChartProps) => {
  const chartConfig = {
    squat: { theme: { light: "#8B5CF6", dark: "#8B5CF6" }, label: "Squat" },
    deadlift: { theme: { light: "#EC4899", dark: "#EC4899" }, label: "Deadlift" },
    benchPress: { theme: { light: "#10B981", dark: "#10B981" }, label: "Bench Press" },
  };
  
  // In a real app, we would filter data based on timeRange
  // For this example, we're using static data
  
  return (
    <ChartContainer
      className="h-[350px]"
      config={chartConfig}
    >
      <LineChart
        data={exerciseData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="squat"
          stroke="var(--color-squat)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="deadlift"
          stroke="var(--color-deadlift)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="benchPress"
          stroke="var(--color-benchPress)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default StrengthProgressChart;
