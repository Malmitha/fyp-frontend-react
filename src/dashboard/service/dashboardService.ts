import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { GetProfileResponse } from "dashboard/model/getProfileResponse";
import { SignoutRequest } from "dashboard/model/signoutRequest";
import { SignoutResponse } from "dashboard/model/signoutResponse";

export const getProfile = async (
  userId: number | null
): Promise<GetProfileResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const GetProfileResponse = await apiClient.post<GetProfileResponse>(
      API_ENDPOINTS.USER.GETPROFILE,
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
    return GetProfileResponse.data;
  } catch (error: any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
    throw new Error(backendErrorMessage);
  }
};

export const userSignout = async (
  userId: number | null,
  loggedInTime: string | null,
): Promise<SignoutResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const loggedinDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const response = await apiClient.post<SignoutResponse>(
      API_ENDPOINTS.AUTH.LOGOUT,
      {
        requestBody: {
          userId: userId,
          loggedInDate: loggedinDate,
          loggedInTime: loggedInTime,
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
