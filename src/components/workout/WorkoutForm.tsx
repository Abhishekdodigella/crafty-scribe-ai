
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Workout } from "@/types";
import { v4 as uuidv4 } from "uuid";

const workoutFormSchema = z.object({
  type: z.string({
    required_error: "Please select a workout type",
  }),
  duration: z.string().min(1, "Duration is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

interface WorkoutFormProps {
  onAddWorkout: (workout: Workout) => void;
}

const WorkoutForm = ({ onAddWorkout }: WorkoutFormProps) => {
  const form = useForm<z.infer<typeof workoutFormSchema>>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof workoutFormSchema>) => {
    const workout: Workout = {
      id: uuidv4(),
      type: values.type,
      duration: parseInt(values.duration),
      date: new Date(values.date),
      notes: values.notes || "",
    };
    
    onAddWorkout(workout);
    form.reset({
      type: "",
      duration: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workout Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="flexibility">Flexibility & Mobility</SelectItem>
                      <SelectItem value="hiit">HIIT</SelectItem>
                      <SelectItem value="sports">Sports & Recreation</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="Enter duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any notes about your workout (exercises, sets, reps, etc.)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Log Workout</Button>
      </form>
    </Form>
  );
};

export default WorkoutForm;
