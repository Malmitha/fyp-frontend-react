import { CreateDailyLogRequest } from "prediction/models/createDailyLogRequest";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { CreateDailyLogResponse } from "prediction/models/createDailyLogResponse";

export const createDailyLog = async (
  payload: CreateDailyLogRequest
): Promise<CreateDailyLogResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<CreateDailyLogResponse>(
      API_ENDPOINTS.APP.MOODCHECK,
      {
        requestBody: {
          userId: payload.userId,
          workHours: payload.workHours,
          socialHours: payload.socialHours,
          entertainmentHours: payload.entertainmentHours,
          sleepHours: payload.sleepHours,
          stressLevel: payload.stressLevel,
          physicalActivityLevel: payload.physicalActivityLevel,
          sleepQuality: payload.sleepQuality,
          wellBeingScore: payload.wellBeingScore,
        },
        requestHeader: {
          requestId: "12345",
          timestamp: timestamp,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
    throw new Error(backendErrorMessage);
  }
};
