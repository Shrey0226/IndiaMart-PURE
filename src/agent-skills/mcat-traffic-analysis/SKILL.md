# Skill: MCAT Traffic Analysis
## Purpose
Deep-dive into category-level demand trends and seller visibility gaps.

## Activation Conditions
- User asks about "traffic", "mcat", "category", or "ranking".
- Seller visibility in primary MCAT drops below 20th percentile.

## Business Rules
- Identify "Opportunity Gaps" where category pageviews are high but seller NI (Needs Inquiry) count is low.

## Expected Inputs
- `mcatTrafficData`: array
- `sellerVisibility`: number
- `buyleadApproved`: number

## Expected Outputs
- `visibilityScore`: 0-100
- `trafficImpact`: string
- `suggestedMcatAdjustments`: string[]
