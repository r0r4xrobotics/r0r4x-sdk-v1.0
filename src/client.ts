import type { R0r4xClientConfig } from "./config.js";
import { createHttpClient } from "./http.js";
import { HpiClient } from "./hpi.js";
import { WartechClient } from "./wartech.js";
import { NewsClient } from "./news.js";

export class R0r4xClient {
  readonly config: R0r4xClientConfig;
  readonly hpi: HpiClient;
  readonly wartech: WartechClient;
  readonly news: NewsClient;

  constructor(config: R0r4xClientConfig) {
    this.config = { ...config };
    const http = createHttpClient(this.config);
    this.hpi = new HpiClient(http);
    this.wartech = new WartechClient(http);
    this.news = new NewsClient(http);
  }
}
