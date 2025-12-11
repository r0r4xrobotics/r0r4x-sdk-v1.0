import type { HttpClient } from "./http.js";
import type { HpiHistoryRange, HpiHistoryResponse, HpiLatestResponse } from "./types.js";

export class HpiClient {
  constructor(private http: HttpClient) {}

  getLatest(): Promise<HpiLatestResponse> {
    return this.http("/api/public/hpi/latest");
  }

  getHistory(params: { country: "US" | "UK" | "CA"; range?: HpiHistoryRange }): Promise<HpiHistoryResponse> {
    const { country, range } = params;
    return this.http("/api/public/hpi/history", {
      query: {
        country,
        ...(range ? { range } : {}),
      },
    });
  }
}
