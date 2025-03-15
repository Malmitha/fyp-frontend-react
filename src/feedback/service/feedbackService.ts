import { StartChatRequest } from "feedback/models/startChatRequest";
import apiClient, { API_ENDPOINTS } from "../../api/axiosInstance";
import { ChatResponse } from "feedback/models/chatResponse";
import { ProfileResponse } from "feedback/models/getProfileResponse";
import { StartChatResponse } from "feedback/models/startChatResponse";

export const getProfile = async (
  userId: number
): Promise<ProfileResponse> => {
  try {
    const timestamp = new Date().toISOString().split(".")[0]; // Format: YYYY-MM-DDTHH:mm:ss
    const response = await apiClient.post<ProfileResponse>(
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
    return response.data;
  } catch (error: any) {
    const backendErrorMessage = error.response.data?.responseHeader?.desc;
    throw new Error(backendErrorMessage);
  }
};

export const startChat =
  async (payload: StartChatRequest): Promise<StartChatResponse> => {
    try {
      const response = await apiClient.post<StartChatResponse>(
        API_ENDPOINTS.NLP.STARTCHAT,
        {
          userId: payload.userId,
          type: payload.type,
          hobbies: payload.hobbies,
          happyActivities: payload.happyActivities,
          age: payload.age,
          occupation: payload.occupation,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error starting chat:", error);
      return { response: "Error starting the conversation." };
    }
  };

  export const chatContinue =
  async (userId: number, userMessage: string): Promise<ChatResponse> => {
    try {
      const response = await apiClient.post<ChatResponse>(
        API_ENDPOINTS.NLP.CHAT,
        {
          userId: userId,
          message: userMessage,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error starting chat:", error);
      return { response: "Error starting the conversation." };
    }
  };
