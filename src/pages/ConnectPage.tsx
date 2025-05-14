
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ConnectPage = () => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = (service: string) => {
    setConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      toast({
        title: "Connected Successfully",
        description: `Your ${service} account has been connected.`,
      });
      setConnecting(false);
    }, 1500);
  };

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Devices & Apps</h1>
        <p className="text-muted-foreground">
          Sync your fitness data from external devices and applications
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Apple Health</CardTitle>
            <CardDescription>Sync data from Apple Health app</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect to Apple Health to import workouts, steps, and other health metrics.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Apple Health")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Fit</CardTitle>
            <CardDescription>Sync data from Google Fit platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Import workouts and activity data from Google Fit and Android devices.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Google Fit")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fitbit</CardTitle>
            <CardDescription>Connect your Fitbit tracker or smartwatch</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sync workouts, heart rate, sleep, and other metrics from your Fitbit device.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Fitbit")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Garmin Connect</CardTitle>
            <CardDescription>Link with your Garmin fitness devices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Import running, cycling, swimming and other activity data from Garmin devices.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Garmin Connect")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strava</CardTitle>
            <CardDescription>Connect with your Strava account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sync running, cycling and other activities tracked in Strava.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Strava")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Samsung Health</CardTitle>
            <CardDescription>Import data from Samsung Health</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect to Samsung Health to import workouts and health data from Galaxy devices.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleConnect("Samsung Health")}
              disabled={connecting}
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectPage;
