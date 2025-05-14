
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import WorkoutsPage from "./pages/WorkoutsPage";
import ProgressPage from "./pages/ProgressPage";
import ConnectPage from "./pages/ConnectPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/connect" element={<ConnectPage />} />
              
              {/* LLM Playground Routes */}
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} 
              />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
