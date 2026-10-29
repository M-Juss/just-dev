export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubActivity = {
  username: string;
  total: number;
  days: ContributionDay[];
  fetchedAt: string;
};

export type TodayWeather = {
  date: string;
  temperature: number;
  high: number;
  low: number;
  code: number;
  isDay: boolean;
  observedAt: string;
  fetchedAt: string;
};
