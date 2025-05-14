
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader, Database, UploadCloud } from "lucide-react";

const ResearchTools = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Research Tools</CardTitle>
            <CardDescription>
              Fine-tuning and evaluation tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="finetune" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="finetune">Fine-tune</TabsTrigger>
                <TabsTrigger value="datasets">Datasets</TabsTrigger>
                <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
              </TabsList>
              
              <TabsContent value="finetune" className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Base Model</h4>
                  <select className="w-full p-2 border rounded-md">
                    <option>GPT-4o Mini</option>
                    <option>Claude 3 Haiku</option>
                    <option>Llama 3</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Training Data</h4>
                  <div className="border border-dashed rounded-md p-6 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop files or click to upload
                    </p>
                    <Button variant="secondary" size="sm">
                      Select files
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  Start Fine-tuning
                </Button>
              </TabsContent>
              
              <TabsContent value="datasets" className="mt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">My Datasets</h4>
                    <Button variant="outline" size="sm">Upload New</Button>
                  </div>
                  <div className="border rounded-md p-4 text-center text-muted-foreground text-sm">
                    No datasets available
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="evaluate" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Evaluation Method</h4>
                    <select className="w-full p-2 border rounded-md">
                      <option>Human Preference</option>
                      <option>ROUGE Score</option>
                      <option>Custom Metric</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Test Dataset</h4>
                    <select className="w-full p-2 border rounded-md">
                      <option>Select dataset...</option>
                    </select>
                  </div>
                  
                  <Button variant="secondary" className="w-full">
                    Run Evaluation
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">
              Fine-tuning Dashboard
            </CardTitle>
            <CardDescription>
              Monitor and manage your fine-tuning jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-md p-8 h-[400px] flex flex-col items-center justify-center text-center">
              <Database className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Active Jobs</h3>
              <p className="text-muted-foreground mb-6">
                Start a fine-tuning job to see progress and results here
              </p>
              <Button>Create Fine-tuning Job</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchTools;
