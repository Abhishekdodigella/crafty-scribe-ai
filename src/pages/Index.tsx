
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPieIcon, DumbbellIcon, ActivityIcon, TrendingUpIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">FitTrack</h1>
        <p className="text-muted-foreground text-lg">
          Track your fitness journey, analyze your progress, and reach your goals
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <DumbbellIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Log Workouts</CardTitle>
            <CardDescription>Record your exercises, sets, reps, and weights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Keep track of all your workouts in one place. Log strength training, cardio, and other activities.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/workouts" className="w-full">
              <Button className="w-full">Start Logging</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <ChartPieIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Track Progress</CardTitle>
            <CardDescription>Visualize your improvements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              See your fitness journey with detailed charts and graphs showing your performance trends.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/progress" className="w-full">
              <Button className="w-full">View Progress</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <ActivityIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Health Sync</CardTitle>
            <CardDescription>Connect with fitness devices and apps</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sync data from your favorite fitness devices and health apps for a complete picture.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/connect" className="w-full">
              <Button className="w-full">Connect Devices</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 text-center">
        <TrendingUpIcon className="h-10 w-10 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Start Your Fitness Journey Today</h2>
        <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
          FitTrack helps you stay motivated by showing your progress and achievements over time.
          Log your first workout and begin tracking your fitness improvements.
        </p>
        <Link to="/workouts">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
