# Skill: Grievance Risk Analysis
## Purpose
Analyze seller grievances to detect hidden fraud risks or systemic service failures.

## Activation Conditions
- User asks about "fraud", "scam", "grievance", or "tickets".
- Seller has > 3 open disputes.
- Legal keywords detected in ticket summaries.

## Business Rules
- Flag for "Fraud Audit" if same complaint type occurs from > 3 different buyers in 7 days.
- Escalate to "High Severity" if refund requests exceed credit value.

## Expected Inputs
- `ticketHistory`: array
- `disputeCount`: number
- `nlpMarkers`: string[]

## Expected Outputs
- `trustScore`: 0-100
- `fraudRiskLevel`: 'Low' | 'Medium' | 'High'
- `actionRecommended`: string
