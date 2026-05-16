# Skill: Upsell Intelligence
## Purpose
Detect high-propensity upsell opportunities based on demand gaps and capacity.

## Activation Conditions
- User asks about "revenue", "upsell", "growth", or "higher plan".
- Seller consumes > 90% of credits before month-end.
- High conversion rate on existing MCATs.

## Business Rules
- Recommend Gold/Platinum upgrade if leads needed > current capacity.
- Suggest MCAT expansion if current MCAT traffic is saturated.

## Expected Inputs
- `creditConsumptionRate`: number
- `leadConversion`: number
- `mcatHealth`: object

## Expected Outputs
- `upsellProbability`: 0-100
- `suggestedPlan`: string
- `revenueOpportunity`: number
