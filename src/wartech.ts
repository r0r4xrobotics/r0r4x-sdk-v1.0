import type { HttpClient } from "./http.js";
import type { WartechHistoryResponse, WartechLatestResponse } from "./types.js";

export class WartechClient {
  constructor(private http: HttpClient) {}

  getLatest(): Promise<WartechLatestResponse> {
    return this.http("/api/public/wartech/latest");
  }

  getHistory(params?: { region?: string; range?: number }): Promise<WartechHistoryResponse> {
    const { region = "WORLD", range = 90 } = params ?? {};
    return this.http("/api/public/wartech/history", {
      query: { region, range },
    });
  }
}
