import { GetDailyLogResponse } from "history/models/getDailyLogsResponse";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";

export const getDailyLogs = async (userId: number|null): Promise<GetDailyLogResponse> =>{
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<GetDailyLogResponse>(
      API_ENDPOINTS.APP.HISTORY,
      {
        requestBody: {
          userId: userId,
        },
        requestHeader: {
          requestId: "12345",
          timestamp: timestamp,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
      throw new Error(backendErrorMessage);
  }
};
