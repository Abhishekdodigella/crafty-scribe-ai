
import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workout } from "@/types";
import { Badge } from "@/components/ui/badge";

interface WorkoutListProps {
  workouts: Workout[];
}

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case "strength":
        return "bg-purple-500";
      case "cardio":
        return "bg-red-500";
      case "flexibility":
        return "bg-green-500";
      case "hiit":
        return "bg-yellow-500";
      case "sports":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getWorkoutTypeName = (type: string) => {
    switch (type) {
      case "strength":
        return "Strength";
      case "cardio":
        return "Cardio";
      case "flexibility":
        return "Flexibility";
      case "hiit":
        return "HIIT";
      case "sports":
        return "Sports";
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
      </CardHeader>
      <CardContent>
        {workouts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No workouts logged yet. Start by adding your first workout!</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workouts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell>
                      {format(new Date(workout.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getWorkoutTypeColor(workout.type)}>
                        {getWorkoutTypeName(workout.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{workout.duration} min</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {workout.notes || "-"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutList;
