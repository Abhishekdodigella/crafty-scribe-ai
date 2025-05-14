
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">FitTrack</h3>
            <p className="text-sm text-muted-foreground">
              Track your fitness journey and reach your goals with our comprehensive workout logging and progress tracking tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/workouts" className="text-sm text-muted-foreground hover:text-foreground">Log Workouts</Link></li>
              <li><Link to="/progress" className="text-sm text-muted-foreground hover:text-foreground">Track Progress</Link></li>
              <li><Link to="/connect" className="text-sm text-muted-foreground hover:text-foreground">Connect Devices</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Facebook</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
