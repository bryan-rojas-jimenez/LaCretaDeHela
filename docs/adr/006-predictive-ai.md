# ADR 006: Predictive Inventory Forecasting

## Status
Accepted

## Context
Standard inventory systems rely on static "low stock" alerts. Business owners need to know *when* they will run out, not just *that* they are low.

## Decision
We implemented a daily "Burn Rate" algorithm that analyzes the last 30 days of transaction volume to predict depletion dates.

## Consequences
- **Pros:** Enables proactive restock planning; dynamic data-driven insights.
- **Cons:** Accuracy is dependent on transaction history volume; doesn't account for external market shifts (yet).
