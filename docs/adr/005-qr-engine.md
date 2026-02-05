# ADR 005: QR Code and Scanner Integration

## Status
Accepted

## Context
The user requested rapid physical inventory management. Manual entry of SKUs is error-prone and slow.

## Decision
We integrated `qrcode.react` for label generation and `html5-qrcode` for real-time camera scanning.

## Consequences
- **Pros:** Dramatic increase in stock-update speed; reduction in data entry errors.
- **Cons:** Requires a device with a camera; lighting conditions can affect scan accuracy.
