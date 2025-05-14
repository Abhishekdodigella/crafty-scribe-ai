
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  onAuthenticated: () => void;
}

const AuthComponent = ({ onAuthenticated }: AuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // In a real app, we would connect to an authentication service
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        id: "user-1",
        name: "Demo User",
        role: "researcher"
      }));
      
      setIsLoading(false);
      toast.success("Login successful");
      onAuthenticated();
      navigate("/dashboard");
    }, 1500);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup delay
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        id: "user-1",
        name: "Demo User",
        role: "researcher"
      }));
      
      setIsLoading(false);
      toast.success("Account created successfully");
      onAuthenticated();
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignup}>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Sign up for a new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <select id="role" className="w-full p-2 border rounded-md">
                  <option value="researcher">Researcher</option>
                  <option value="developer">Developer</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthComponent;
