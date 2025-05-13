
import { toast } from "@/components/ui/sonner";
import { WritingStyle } from "@/types";

export const generateText = async (
  prompt: string, 
  style: WritingStyle, 
  apiKey: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("Please enter your OpenAI API key");
    }

    const systemPrompt = `You are an expert writer who responds in the following style: ${style.prompt}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate text");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating text:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to generate text",
      variant: "destructive"
    });
    throw error;
  }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    if (!apiKey || apiKey.trim() === "") return false;
    
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
  }
};
