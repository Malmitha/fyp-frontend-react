export interface CreateDailyLogResponse {
  responseBody: {
    moodLog: {
      logId: number;
      rating: number;
      category: string;
      type: string;
      logDate: string;
      logTime: string;
    };
    message: string;
    dailyDataLogId: number;
  };
}
