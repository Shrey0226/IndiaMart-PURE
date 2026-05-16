# Skill: Seller Health Scoring
## Purpose
Generate a unified health index by aggregating all sub-skill analyses.

## Activation Conditions
- Generic "How is the seller doing?" queries.
- Dashboard initial load.

## Business Rules
- Final score = Weighted average (Engagement 40%, Risk 30%, Growth 30%).

## Expected Inputs
- `engagementMetrics`: object
- `riskMetrics`: object
- `growthMetrics`: object

## Expected Outputs
- `compositeHealthScore`: 0-100
- `healthStatus`: 'Superior' | 'Stagnant' | 'Declining'
- `primaryConcerns`: string[]
