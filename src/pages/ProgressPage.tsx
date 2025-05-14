
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StrengthProgressChart from "@/components/charts/StrengthProgressChart";
import CardioProgressChart from "@/components/charts/CardioProgressChart";
import WorkoutFrequencyChart from "@/components/charts/WorkoutFrequencyChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProgressPage = () => {
  const [timeRange, setTimeRange] = useState("30days");

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Progress Dashboard</h1>
        <p className="text-muted-foreground">
          Visualize your fitness journey with detailed charts and statistics
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Performance Trends</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 3 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="frequency">Workout Frequency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strength">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <StrengthProgressChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cardio">
          <Card>
            <CardHeader>
              <CardTitle>Cardio Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardioProgressChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frequency">
          <Card>
            <CardHeader>
              <CardTitle>Workout Frequency</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <WorkoutFrequencyChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
