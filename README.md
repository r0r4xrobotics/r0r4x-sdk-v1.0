
# **@r0r4x/sdk — Official JavaScript & TypeScript Client for r0r4x Public API v1**

The official SDK for accessing **r0r4x Public API v1**, an intelligence layer that monitors humanoid robotics adoption, AI-driven geopolitical risk, and real-time global narrative signals.

This SDK is intended for:

* AI agents and autonomous systems
* Prediction markets and on-chain protocols
* Quantitative and macro researchers
* Robotics and AI analytics
* Automated workflows and decision pipelines

The package is lightweight, fully typed, ESM-first, and compatible with multiple runtimes including Node, Deno, Bun, and serverless environments.

---

# Installation

```bash
npm install @r0r4x/sdk
# oppure
pnpm add @r0r4x/sdk
```

---

# Prerequisites

### 1. A valid r0r4x API Key

This can be generated in the dashboard at:
**r0r4x.com → Dashboard → Developer → API Keys**

### 2. Base URL

Production base URL (always the same):

```
https://r0r4x.com
```

### 3. Environment variables (recommended)

Create a `.env` file:

```env
R0R4X_API_KEY=your_api_key_here
R0R4X_BASE_URL=https://r0r4x.com
```

Load it in Node.js (optional):

```ts
import "dotenv/config";
```

---

# Quick Start

```ts
import { R0r4xClient } from "@r0r4x/sdk";
import "dotenv/config";

const client = new R0r4xClient({
  baseUrl: process.env.R0R4X_BASE_URL!,
  apiKey: process.env.R0R4X_API_KEY!,
});

async function main() {
  const hpi = await client.hpi.getLatest();
  console.log("Latest HPI:", hpi);

  const war = await client.wartech.getHistory({ region: "WORLD", range: 90 });
  console.log("WarTech points:", war.points.length);

  const news = await client.news.getLatest({ range: "2h" });
  console.log("Recent news:", news.news.slice(0, 2));
}

main().catch(console.error);
```

---

# Public API v1 — Supported Endpoints

The SDK provides access to six read-only, stable endpoints.

## Humanoid Panic Index (HPI)

* `GET /api/public/hpi/latest`
* `GET /api/public/hpi/history?country=US&range=3M`

## WarTech (AI-driven geopolitical signals)

* `GET /api/public/wartech/latest`
* `GET /api/public/wartech/history?region=WORLD&range=90`

## NewsPulse (real-time global event and narrative signals)

* `GET /api/public/news/latest?range=2h`
* `GET /api/public/news/index?range=90d`

All endpoints require a Bearer API Key for authentication.

---

# SDK API Reference

### HPI

```ts
client.hpi.getLatest(): Promise<HpiLatestResponse>
client.hpi.getHistory({ country, range? }): Promise<HpiHistoryResponse>
```

### WarTech

```ts
client.wartech.getLatest(): Promise<WartechLatestResponse>
client.wartech.getHistory({ region?, range? }): Promise<WartechHistoryResponse>
```

### NewsPulse

```ts
client.news.getLatest({ range?, kind?, region?, severity? }): Promise<WartechNewsLatestResponse>
client.news.getIndex({ range? }): Promise<WartechNewsIndexResponse>
```

All parameters follow backend-enforced enums and validation rules.

---

# Error Handling

The SDK throws a standardized error object (`R0r4xApiError`) whenever the API responds with an error payload.

Example:

```ts
import { R0r4xApiError } from "@r0r4x/sdk";

try {
  await client.hpi.getLatest();
} catch (err) {
  if (err instanceof R0r4xApiError) {
    console.error("API error:", err.status, err.code, err.message);
  }
}
```

Standard API error codes include:

| Code             | Description                  |
| ---------------- | ---------------------------- |
| `UNAUTHORIZED`   | Missing or invalid API key   |
| `FORBIDDEN`      | API key revoked or inactive  |
| `BAD_REQUEST`    | Invalid parameters           |
| `NOT_FOUND`      | Resource not found           |
| `INTERNAL_ERROR` | Unexpected server-side error |

---

# Runtime Compatibility

| Runtime            | Support                                     |
| ------------------ | ------------------------------------------- |
| Node.js ≥ 18       | Supported (native `fetch`)                  |
| Node.js < 18       | Supported via custom `fetch` implementation |
| Deno               | Supported                                   |
| Bun                | Supported                                   |
| Cloudflare Workers | Supported                                   |

Example with custom `fetch`:

```ts
import fetch from "node-fetch";

const client = new R0r4xClient({
  baseUrl: "https://r0r4x.com",
  apiKey: "...",
  fetch,
});
```

---

# Versioning Policy

This SDK corresponds to **r0r4x Public API v1**.
Breaking changes will only be introduced in **v2**, with deprecation details announced beforehand.

---

# License

The Apache License 2.0

---

# About r0r4x

r0r4x is a multi-modal intelligence platform tracking humanoid robotics acceleration, macro-level AI adoption dynamics, geopolitical conflict signals, and real-time global AI/war narratives.

Further information available at: **[https://r0r4x.com](https://r0r4x.com)**

