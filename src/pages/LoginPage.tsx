
import { useState } from "react";
import AuthComponent from "@/components/auth/AuthComponent";

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <div className="container max-w-screen-lg mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">LLM Research Playground</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experiment with cloud AI models, research-driven fine-tuning, and advanced prompt engineering
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Research & Experiment</h2>
            <p className="text-muted-foreground">
              Access multiple LLMs from cloud providers and test their capabilities with advanced prompt engineering.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Fine-Tune Models</h2>
            <p className="text-muted-foreground">
              Upload custom datasets and fine-tune models to your specific use case or research area.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Analyze Performance</h2>
            <p className="text-muted-foreground">
              Track model responses, latency, and accuracy metrics to benchmark performance.
            </p>
          </div>
        </div>
        
        <div>
          <AuthComponent onAuthenticated={() => setIsAuthenticated(true)} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
