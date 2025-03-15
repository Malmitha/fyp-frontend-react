import { GetProfileResponse } from "update-profile/models/getProfileResponse";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { UpdateCredentialsRequest } from "update-credentials/models/updateCredentialsRequest";
import { UpdateCredentialsResponse } from "update-credentials/models/updateCredentialsResponse";

export const updateCredentials = async (
  userId: number | null,
  payload: UpdateCredentialsRequest
): Promise<UpdateCredentialsResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<UpdateCredentialsResponse>(
      API_ENDPOINTS.USER.UPDATECREDENTIALS,
      {
        requestBody: {
          userId: userId,
          username: payload.username,
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
          confirmPassword: payload.confirmPassword,
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
