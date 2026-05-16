import { SkillMetadata } from './types';

export const SKILL_REGISTRY: SkillMetadata[] = [
  {
    id: 'churn-analysis',
    name: 'Churn Analysis',
    description: 'Predicts seller churn risk based on activity and engagement signals.',
    icon: 'UserMinus',
    version: '1.0.0',
    category: 'Retention'
  },
  {
    id: 'upsell-intelligence',
    name: 'Upsell Intelligence',
    description: 'Identifies high-value growth and plan upgrade opportunities.',
    icon: 'TrendingUp',
    version: '1.0.0',
    category: 'Growth'
  },
  {
    id: 'grievance-risk-analysis',
    name: 'Grievance Risk',
    description: 'Real-time NLP analysis of seller tickets to detect legal or fraud risk.',
    icon: 'AlertOctagon',
    version: '1.0.0',
    category: 'Risk'
  },
  {
    id: 'mcat-traffic-analysis',
    name: 'MCAT Traffic',
    description: 'Analyzes category-level demand and seller traffic share.',
    icon: 'BarChart3',
    version: '1.0.0',
    category: 'Category'
  },
  {
    id: 'catalog-relevance',
    name: 'Catalog Relevance',
    description: 'Monitors NI hide reasons to ensure catalog-category alignment.',
    icon: 'FileSearch',
    version: '1.0.0',
    category: 'Catalog'
  },
  {
    id: 'seller-health-scoring',
    name: 'Seller Health Score',
    description: 'Holistic 360° health check aggregating all intelligence vectors.',
    icon: 'Activity',
    version: '1.0.0',
    category: 'Health'
  }
];
