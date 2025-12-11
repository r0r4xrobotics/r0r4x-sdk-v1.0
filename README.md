# @r0r4x/sdk — JavaScript & TypeScript client for r0r4x Public API v1

A lightweight, fully typed SDK for consuming the r0r4x Public API v1 from Node.js or modern runtimes with `fetch` support.

## Installation

```bash
npm install @r0r4x/sdk
# oppure
pnpm add @r0r4x/sdk
```

## Prerequisiti

- Una API key r0r4x generata dalla Developer Console.
- Un `baseUrl`, per esempio:
  - `https://r0r4x.com` (quando sarà live)
  - L'URL Vercel corrente, es: `https://r0r4x-km0el7ba6-fluidtypes-projects.vercel.app`

Se l'ambiente non espone `fetch` (es. Node.js < 18), passa una implementazione custom tramite la config.

## Quick Start

```ts
import { R0r4xClient } from "@r0r4x/sdk";

const client = new R0r4xClient({
  baseUrl: "https://r0r4x-km0el7ba6-fluidtypes-projects.vercel.app",
  apiKey: process.env.R0R4X_API_KEY!,
});

async function main() {
  const latestHpi = await client.hpi.getLatest();
  console.log(latestHpi);

  const worldWartech = await client.wartech.getHistory({ region: "WORLD", range: 90 });
  console.log(worldWartech.points.length, "wartech points");

  const news = await client.news.getLatest({ range: "2h", kind: "EVENT" });
  console.log(news.news.slice(0, 3));
}

main().catch(console.error);
```

## Configurazione

`R0r4xClientConfig` accetta:

- `baseUrl` (string): host di r0r4x (es. `https://r0r4x.com`).
- `apiKey` (string): API key in chiaro.
- `fetch` (opzionale): implementazione alternativa di `fetch` (utile in Node < 18, Deno, Cloudflare Workers, test, ecc.).

## API Reference

- `client.hpi.getLatest(): Promise<HpiLatestResponse>`
- `client.hpi.getHistory({ country, range? }): Promise<HpiHistoryResponse>`
- `client.wartech.getLatest(): Promise<WartechLatestResponse>`
- `client.wartech.getHistory({ region?, range? }): Promise<WartechHistoryResponse>`
- `client.news.getLatest({ range?, kind?, region?, severity? }): Promise<WartechNewsLatestResponse>`
- `client.news.getIndex({ range? }): Promise<WartechNewsIndexResponse>`

## Errori

Lo SDK solleva `R0r4xApiError` quando il server risponde con `{ status, error, message }`.

```ts
import { R0r4xClient, R0r4xApiError } from "@r0r4x/sdk";

try {
  await client.hpi.getLatest();
} catch (err) {
  if (err instanceof R0r4xApiError) {
    console.error("API error:", err.status, err.code, err.message);
  } else {
    console.error("Unknown error", err);
  }
}
```

Codici tipici:

- `UNAUTHORIZED` → API key assente o invalida
- `FORBIDDEN` → API key revocata/disattivata
- `BAD_REQUEST` → parametri invalidi
- Altri status HTTP vengono riportati con un errore generico

## Versioning / v1 Freeze

Questo SDK è allineato alla Public API **v1**. Eventuali breaking changes futuri saranno pubblicati come v2.
