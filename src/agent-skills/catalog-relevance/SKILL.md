# Skill: Catalog Relevance
## Purpose
Ensure seller catalog aligns with assigned MCATs to maximize lead quality.

## Activation Conditions
- User asks about "relevance", "catalog", "wrong category", or "leads quality".
- Reject rate of leads > 40%.

## Business Rules
- Flag "MCAT Mismatch" if NI hides reason is consistently "Not dealing in this product".

## Expected Inputs
- `rejectedLeadReasons`: string[]
- `niHideCount`: number
- `catalogDetails`: object

## Expected Outputs
- `relevanceScore`: 0-100
- `mismatchedMcats`: string[]
- `enrichmentTips`: string[]
