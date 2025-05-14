
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const frequencyData = [
  { day: "Mon", strength: 1, cardio: 0, flexibility: 0 },
  { day: "Tue", strength: 0, cardio: 1, flexibility: 1 },
  { day: "Wed", strength: 1, cardio: 0, flexibility: 0 },
  { day: "Thu", strength: 0, cardio: 1, flexibility: 0 },
  { day: "Fri", strength: 1, cardio: 0, flexibility: 1 },
  { day: "Sat", strength: 0, cardio: 0, flexibility: 0 },
  { day: "Sun", strength: 0, cardio: 1, flexibility: 1 },
];

interface WorkoutFrequencyChartProps {
  timeRange: string;
}

const WorkoutFrequencyChart = ({ timeRange }: WorkoutFrequencyChartProps) => {
  const chartConfig = {
    strength: { theme: { light: "#8B5CF6", dark: "#8B5CF6" }, label: "Strength" },
    cardio: { theme: { light: "#EF4444", dark: "#EF4444" }, label: "Cardio" },
    flexibility: { theme: { light: "#10B981", dark: "#10B981" }, label: "Flexibility" },
  };
  
  return (
    <ChartContainer
      className="h-[350px]"
      config={chartConfig}
    >
      <BarChart
        data={frequencyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="strength" stackId="a" fill="var(--color-strength)" />
        <Bar dataKey="cardio" stackId="a" fill="var(--color-cardio)" />
        <Bar dataKey="flexibility" stackId="a" fill="var(--color-flexibility)" />
      </BarChart>
    </ChartContainer>
  );
};

export default WorkoutFrequencyChart;
