import { SignUpRequest } from "sign-up/models/signupRequest";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { SignUpResponse } from "sign-up/models/signupResponse";

export const createUser = async (payload: SignUpRequest): Promise<SignUpResponse> =>{
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const SignUpResponse = await apiClient.post<SignUpResponse>(API_ENDPOINTS.AUTH.SIGNUP, { 
        requestBody: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          nickName: payload.nickName,
          gender: payload.gender,
          age: payload.age,
          dateOfBirth: payload.dateOfBirth,
          username: payload.username,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
          email: payload.email,
          occupation: payload.occupation,
          hobbies: payload.hobbies,
          happyActivities: payload.happyActivities
    },
    requestHeader: {
        requestId: "12345",
        timestamp: timestamp
    }
 });
    return SignUpResponse.data;
  } catch (error:any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
      throw new Error(backendErrorMessage);
  }
};
