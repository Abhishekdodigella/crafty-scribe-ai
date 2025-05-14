
import { Link, useLocation } from "react-router-dom";
import { DumbbellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground";
  };

  return (
    <header className="border-b">
      <div className="container max-w-6xl py-4 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <DumbbellIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">FitTrack</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-sm ${isActive("/")}`}>
            Home
          </Link>
          <Link to="/workouts" className={`text-sm ${isActive("/workouts")}`}>
            Workouts
          </Link>
          <Link to="/progress" className={`text-sm ${isActive("/progress")}`}>
            Progress
          </Link>
          <Link to="/connect" className={`text-sm ${isActive("/connect")}`}>
            Connect
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
