export interface IdeaVariant {
  title: string;
  hook: string;
  description: string;
}

export interface ContentIdea {
  id: string;
  concept: string;
  whyItWorks: string;
  variants: [IdeaVariant, IdeaVariant];
  sources?: { uri: string; title: string }[];
}

export interface StrategyAudit {
  score: number;
  strengths: string[];
  weaknesses: string[];
  quickWin: string;
  analysis: string; // Detailed thinking output
}

export interface UsageStats {
  ideasGenerated: number;
  lastIdeaDate: string;
  auditsGenerated: number;
  lastAuditDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  HOME = 'HOME',
  GENERATOR = 'GENERATOR',
  STRATEGY = 'STRATEGY',
  PRICING = 'PRICING'
}