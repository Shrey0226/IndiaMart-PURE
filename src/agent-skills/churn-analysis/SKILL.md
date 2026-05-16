# Skill: Churn Analysis
## Purpose
Analyze seller churn risk based on activity patterns, engagement levels, and sentiment.

## Activation Conditions
- User asks about "churn", "leaving", "retention", or "risk".
- Seller credit usage drops significantly.
- High volume of negative tickets.

## Business Rules
- Probability > 70% if inactivity > 30 days and credit usage < 10% of monthly average.
- Flag as "High Risk" if multiple late PNS pickups occur within 7 days.

## Expected Inputs
- `creditUsageHistory`: Array of numbers
- `lastActivityDate`: string
- `ticketSentiment`: 'positive' | 'neutral' | 'negative'
- `pnsMetrics`: Object

## Expected Outputs
- `churnProbability`: 0-100
- `riskFactors`: string[]
- `retentionStrategy`: string
