export type SkillId = 
  | 'churn-analysis' 
  | 'upsell-intelligence' 
  | 'grievance-risk-analysis' 
  | 'mcat-traffic-analysis' 
  | 'catalog-relevance' 
  | 'seller-health-scoring';

export interface SkillMetadata {
  id: SkillId;
  name: string;
  description: string;
  icon: string;
  version: string;
  category: 'Retention' | 'Growth' | 'Risk' | 'Category' | 'Catalog' | 'Health';
}

export interface SkillDefinition extends SkillMetadata {
  instructions: string;
  activationConditions: string[];
  expectedInputs: string[];
  expectedOutputs: string[];
}

export interface SkillExecutionResult {
  skillId: SkillId;
  insights: any;
  confidence: number;
  timestamp: string;
  reasoningTrace: string[];
}

export interface AgentState {
  availableSkills: SkillMetadata[];
  activeSkills: SkillId[];
  history: SkillExecutionResult[];
  isExecuting: boolean;
}
