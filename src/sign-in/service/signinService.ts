import { SignInRequest } from "sign-in/model/signInRequest";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { SignInResponse } from "sign-in/model/signInResponse";

export const loginUser = async (payload: SignInRequest): Promise<SignInResponse> =>{
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<SignInResponse>(API_ENDPOINTS.AUTH.SIGNIN, { 
        requestBody: {
        username: payload.username,
        password: payload.password
    },
    requestHeader: {
        requestId: "12345",
        timestamp: timestamp
    }
 });
    return response.data;
  } catch (error:any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
      throw new Error(backendErrorMessage);
  }
};
