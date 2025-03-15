import { GetProfileResponse } from "update-profile/models/getProfileResponse";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { UpdateProfileRequest } from "update-profile/models/updateProfileRequest";
import { UpdateProfileResponse } from "update-profile/models/updateProfileResponse";

export const updateProfile = async (
  userId: number | null,
  payload: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<UpdateProfileResponse>(
      API_ENDPOINTS.USER.UPDATEPROFILE,
      {
        requestBody: {
          userId: userId,
          nickName: payload.nickName,
          email: payload.email,
          occupation: payload.occupation,
          hobbies: payload.hobbies,
          happyActivities: payload.happyActivities,
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

export const getProfile = async (userId: number|null): Promise<GetProfileResponse> =>{
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
  } catch (error:any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
      throw new Error(backendErrorMessage);
  }
};
