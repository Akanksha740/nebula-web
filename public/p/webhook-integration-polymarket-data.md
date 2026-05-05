# Webhook Integration Guide for Polymarket Data

> Set up real-time webhooks to receive Polymarket order book updates and market events from PolyHistorical.

*Category: API & Developers*

## What Are Webhooks?

Webhooks allow PolyHistorical to **push data to your application** in real time, instead of requiring you to poll the API. When a relevant event occurs — such as a significant order book change or market resolution — PolyHistorical sends an HTTP POST request to your configured endpoint with the event data.

## Supported Webhook Events

| Event Type | Description | Typical Use Case |
| --- | --- | --- |
| order_book.snapshot | New order book snapshot captured | Real-time dashboards, live monitoring |
| spread.threshold | Bid-ask spread crosses configured threshold | Spread trading alerts |
| depth.change | Significant change in order book depth | Liquidity monitoring, whale alerts |
| market.resolution | A prediction market has resolved | Settlement tracking, P&L calculation |
| market.new | New prediction market created | Auto-discovery of new trading opportunities |

## Setting Up a Webhook Endpoint

To receive webhooks, you need an HTTPS endpoint that can accept POST requests. Here is what your endpoint should do:

- Accept POST requests with a JSON body
- Return a **200 OK** response within 5 seconds
- Verify the webhook signature using your API secret
- Process the event asynchronously (queue it for background processing)

### Security Best Practices

- Always verify the **X-PolyHistorical-Signature** header using HMAC-SHA256
- Use HTTPS for your endpoint — HTTP endpoints will be rejected
- Implement idempotency — webhooks may be delivered more than once
- Store a unique event ID with each processed webhook to detect duplicates

## Webhook Payload Structure

Each webhook payload includes the event type, timestamp, market ID, and the relevant data. For order book snapshots, the payload contains the full bid and ask arrays. For market resolution events, it includes the resolution outcome and final price.

## Handling Failures and Retries

If your endpoint returns a non-2xx response or times out, PolyHistorical will retry the delivery with **exponential backoff**:

- First retry: 30 seconds after initial attempt
- Second retry: 2 minutes after first retry
- Third retry: 10 minutes after second retry
- After 3 failed retries, the webhook is marked as failed (viewable in dashboard)

## Use Cases for Webhooks

Webhooks are ideal for building **event-driven applications** that react to Polymarket changes in real time. Trading bots can receive order book updates without polling. Alerting systems can notify you of unusual spread or depth changes. Research platforms can automatically ingest new data as it becomes available.

## Availability

Webhook integration is available on the **Pro plan ($11/month)** and above. Configure webhooks through the PolyHistorical dashboard or API.

## Related Resources

- [PolyHistorical API Authentication and Security Guide](/p/polyhistorical-api-authentication-guide)
- [Polymarket Historical Data API Documentation](/p/polymarket-historical-data-api-documentation)
- [Rate Limiting Best Practices for PolyHistorical API](/p/rate-limiting-best-practices-polyhistorical)

---
Source: https://polyhistorical.com/p/webhook-integration-polymarket-data
