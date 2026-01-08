
export type BetSide = 'BANKER' | 'PLAYER' | 'TIE' | 'WAIT';

export interface Hand {
  id: string;
  side: BetSide;
  timestamp: number;
}

export interface PredictionResult {
  side: BetSide;
  confidence: number;
  unit: number;
  reasoning: string;
}

export interface Formula {
  id: string;
  title: string;
  tag: string;
  iconName: string;
  description: string;
  instructions: string;
  complexity: string;
  complexityColor: string;
  winRate: string;
  logicDescription: string;
}

export interface AppSettings {
  aiSensitivity: number;
  aggressionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  autoAnalyze: boolean;
  soundEnabled: boolean;
  detailedReasoning: boolean;
}

export interface AppState {
  history: Hand[];
  currentPrediction: PredictionResult | null;
  isAnalyzing: boolean;
  timer: number;
  activeFormulaId: string | null;
}
