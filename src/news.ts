import type { HttpClient } from "./http.js";
import type {
  WartechNewsIndexRange,
  WartechNewsIndexResponse,
  WartechNewsKind,
  WartechNewsLatestResponse,
  WartechNewsSeverity,
  WartechRegion,
} from "./types.js";

export class NewsClient {
  constructor(private http: HttpClient) {}

  getLatest(params?: {
    range?: "2h" | "24h";
    kind?: WartechNewsKind;
    region?: WartechRegion;
    severity?: WartechNewsSeverity;
  }): Promise<WartechNewsLatestResponse> {
    const { range = "2h", kind, region, severity } = params ?? {};
    return this.http("/api/public/news/latest", {
      query: {
        range,
        ...(kind ? { kind } : {}),
        ...(region ? { region } : {}),
        ...(severity ? { severity } : {}),
      },
    });
  }

  getIndex(params?: { range?: WartechNewsIndexRange }): Promise<WartechNewsIndexResponse> {
    const { range = "90d" } = params ?? {};
    return this.http("/api/public/news/index", {
      query: { range },
    });
  }
}
