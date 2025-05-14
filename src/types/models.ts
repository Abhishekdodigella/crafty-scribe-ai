
export enum CloudProvider {
  OpenAI = "OpenAI",
  Anthropic = "Anthropic",
  Google = "Google", 
  Azure = "Azure",
  AWS = "AWS",
  Meta = "Meta",
  Custom = "Custom"
}

export interface Model {
  id: string;
  name: string;
  provider: CloudProvider;
  description: string;
}

export interface ModelResponse {
  id: string;
  model: string;
  text: string;
  finishReason: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  createdAt: Date;
}
