import type { R0r4xClientConfig } from "./config.js";

export class R0r4xApiError extends Error {
  status: number;
  code: string;
  body: unknown;

  constructor(status: number, code: string, message?: string, body?: unknown) {
    super(message ?? code);
    this.name = "R0r4xApiError";
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

export type HttpClient = <T>(
  path: string,
  init?: RequestInit & { query?: Record<string, string | number | undefined> }
) => Promise<T>;

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, "");

const buildUrl = (baseUrl: string, path: string, query?: Record<string, string | number | undefined>) => {
  const url = new URL(`${normalizeBaseUrl(baseUrl)}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
};

const parseJsonSafe = async (response: Response): Promise<unknown | undefined> => {
  try {
    return await response.json();
  } catch (error) {
    return undefined;
  }
};

const isJsonResponse = (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json");
};

export const createHttpClient = (config: R0r4xClientConfig): HttpClient => {
  const fetchImpl = config.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new Error("fetch is not available in this environment. Provide a custom fetch in the client config.");
  }

  return async <T>(path: string, init?: RequestInit & { query?: Record<string, string | number | undefined> }) => {
    const { query, headers, ...rest } = init ?? {};
    const url = buildUrl(config.baseUrl, path, query);

    const requestHeaders = new Headers(headers);
    requestHeaders.set("Authorization", `Bearer ${config.apiKey}`);
    if (rest.body && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }

    const response = await fetchImpl(url, { ...rest, headers: requestHeaders });
    const jsonBody = isJsonResponse(response) ? await parseJsonSafe(response) : undefined;

    if (!response.ok) {
      if (
        jsonBody &&
        typeof jsonBody === "object" &&
        "status" in jsonBody &&
        "error" in jsonBody
      ) {
        const body = jsonBody as { status: number; error: string; message?: string };
        throw new R0r4xApiError(body.status ?? response.status, body.error, body.message ?? response.statusText, jsonBody);
      }

      const text = typeof jsonBody === "string" ? jsonBody : await response.text();
      throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
    }

    if (jsonBody !== undefined) {
      return jsonBody as T;
    }

    return (await response.text()) as T;
  };
};
