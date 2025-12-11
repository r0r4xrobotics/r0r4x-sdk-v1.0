// HPI
export type HpiLatestItem = {
  country: "US" | "UK" | "CA";
  date: string | null;
  panicIndex: number | null;
  scoreH: number | null;
  scoreShare: number | null;
  scoreMomentum: number | null;
  confidence: number | null;
  regime: string | null;
};

export type HpiLatestResponse = {
  date: string | null;
  items: HpiLatestItem[];
};

export type HpiHistoryPoint = {
  date: string;
  panicIndex: number;
  scoreH: number;
  scoreShare: number;
  scoreMomentum: number;
  confidence: number;
  regime: string;
  humanoidJobs: number | null;
  automationJobsRaw: number | null;
  sectorJobs: number | null;
  shareT: number | null;
};

export type HpiHistoryRange = "1M" | "3M" | "6M" | "1Y" | "MAX";
export type HpiHistoryResponse = HpiHistoryPoint[];

// WarTech
export type WartechSnapshot = {
  date: string;
  regionCode: string;
  conflictEventsCount: number;
  protestEventsCount: number;
  repressionEventsCount: number;
  aiNarrativeVolume: number;
  aiWarIntersectionVolume: number;
  humanoidNarrativeVolume: number;
  warNarrativeVolume: number;
  droneConflictVolume: number;
  protestsAutomationVolume: number;
  wartechIndex: number | null;
};

export type WartechLatestResponse = {
  date: string | null;
  snapshots: WartechSnapshot[];
};

export type WartechHistoryResponse = {
  regionCode: string;
  points: WartechSnapshot[];
};

export type WartechRegion = string;

// News
export type WartechNewsLocation = {
  countryCode: string | null;
  countryName: string | null;
  adm1Name: string | null;
  cityName: string | null;
  latitude: number | null;
  longitude: number | null;
  order: number;
};

export type WartechNewsSeverity = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";
export type WartechNewsKind = "EVENT" | "NARRATIVE";

export type WartechNewsItem = {
  id: string;
  kind: WartechNewsKind;
  timestamp: string;
  primaryCountryCode: string | null;
  primaryCountryName: string | null;
  region: string;
  tone: number;
  goldsteinScale: number | null;
  severity: WartechNewsSeverity;
  eventRootCode: string | null;
  eventCode: string | null;
  sourceUrl: string;
  sourceDomain: string | null;
  shortLabel: string;
  themesShort: string | null;
  personsShort: string | null;
  orgsShort: string | null;
  locations: WartechNewsLocation[];
};

export type WartechNewsLatestResponse = {
  from: string;
  to: string;
  news: WartechNewsItem[];
};

export type WartechNewsDailySnapshot = {
  date: string;
  eventCount: number;
  severeEventCount: number;
  narrativeCount: number;
  avgEventTone: number;
  avgNarrativeTone: number;
  newsIndex: number | null;
};

export type WartechNewsIndexRange = "30d" | "90d" | "180d";

export type WartechNewsIndexResponse = {
  range: WartechNewsIndexRange;
  snapshots: WartechNewsDailySnapshot[];
};
