export interface CreateDailyLogRequest {
    userId: number,
    workHours: number,
    socialHours: number,
    entertainmentHours: number,
    sleepHours: number,
    stressLevel: number,
    physicalActivityLevel: number,
    sleepQuality: number,
    wellBeingScore: number
  }