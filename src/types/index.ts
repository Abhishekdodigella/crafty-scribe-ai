
export type WritingStyle = {
  id: string;
  name: string;
  description: string;
  prompt: string;
};

export type GeneratedResponse = {
  id: string;
  prompt: string;
  response: string;
  style: WritingStyle;
  timestamp: Date;
};

export type ApiKeyState = {
  key: string;
  isValid: boolean;
};
