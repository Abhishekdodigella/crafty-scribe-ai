
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import WorkoutForm from "@/components/workout/WorkoutForm";
import WorkoutList from "@/components/workout/WorkoutList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workout } from "@/types";

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { toast } = useToast();

  const addWorkout = (workout: Workout) => {
    setWorkouts([...workouts, workout]);
    toast({
      title: "Workout added",
      description: "Your workout has been logged successfully.",
    });
  };

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workouts</h1>
        <p className="text-muted-foreground">
          Log your workouts and keep track of your training sessions
        </p>
      </header>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="log">Log Workout</TabsTrigger>
          <TabsTrigger value="history">Workout History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Add New Workout</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkoutForm onAddWorkout={addWorkout} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <WorkoutList workouts={workouts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutsPage;
