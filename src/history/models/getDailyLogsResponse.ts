export interface GetDailyLogResponse {
  responseBody: {
    dates: string[];
    dailyLogs: DailyLogs[];
    moodLogs: MoodLogs[];
  };
}

export interface MoodLogs {
  logId: number;
  rating: number;
  category: string;
  type: string;
  logDate: string;
  logTime: string;
}

export interface DailyLogs {
  workHours: number;
  socialHours: number;
  entertainmentHours: number;
  sleepHours: number;
  stressLevel: number;
  sleepQuality: number;
  physicalActivityLevel: number;
  wellBeingScore: number;
  logId: number;
  date: string;
}
