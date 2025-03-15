import React, { useEffect, useState } from "react";
import "../style/style.css";
import "../style/stylingFeedback.css";
import { Button, Input, notification } from "antd";
import { DislikeTwoTone, LeftCircleTwoTone, LikeTwoTone, } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetProfileResponse } from "dashboard/model/getProfileResponse";
import { getProfile } from "dashboard/service/dashboardService";
import { StartChatRequest } from "./models/startChatRequest";
import { StartChatResponse } from "./models/startChatResponse";
import { startChat, chatContinue } from "./service/feedbackService";


const MoodFeedback: React.FC = () => {
  const navigate = useNavigate(); // To navigate to another page
  const [userData, setUserData] = useState<GetProfileResponse | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [chatExited, setChatExited] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [moodType, setMoodType] = useState<string>("");
  const [satisfactionAnswered, setSatisfactionAnswered] = useState(false);

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "Sign out Failed",
      description: message,
      placement: "topRight",
    });
  };
  
  useEffect(() => {
    // Retrieve userId from sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    const storedMoodType = sessionStorage.getItem("moodType");
    if (storedUserId && storedMoodType) {
      setUserId(() => Number(storedUserId)); // Ensures latest update
      setMoodType(storedMoodType);
    }
  }, []);

  useEffect(() => {
    console.log("Updated userId:", userId);
    console.log("Updated moodType:", moodType);
  }, [userId, moodType]);

  const moodColors: Record<string, string> = {
    Positive: "rgb(204, 255, 204)",
    Negative: "rgb(178, 187, 255)",
    Neutral: "rgb(186, 255, 246)",
  };

  const moodIcon: Record<string, string> = {
    Positive: "☺️",
    Negative: "☹️",
    Neutral: "😐",
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getProfile(userId);
        setUserData(response);
      } catch (error:any) {
        console.error("Error fetching user details", error.message);
        openNotification("error", error.message);
      }
    };

    getUserDetails();
  }, [userId]);

  useEffect(() => {
    const initiateChat = async () => {
      if (!userData) return;

      const feedbackData: StartChatRequest = {
        userId: userId ?? null,
        type: moodType ?? null,
        hobbies: userData?.responseBody.hobbies ?? [],
        happyActivities: userData?.responseBody.activities ?? [],
        age: userData?.responseBody.profile.age ?? null,
        occupation: userData?.responseBody.profile.occupation ?? null,
      };
      try {
        const chatResponse: StartChatResponse = await startChat(feedbackData);
        setChatMessages([chatResponse.response]);
      } catch (error:any) {
        console.error("Error starting chat:", error);
        openNotification("error", error.message);
      }
    };

    initiateChat();
  }, [userId, moodType, userData]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Prevents sending empty messages

    setChatMessages((prev) => [...prev, `You: ${userMessage}`]); // Adds user's message to chat history

    try {
      const chatResponse = await chatContinue(userId, userMessage);
      setChatMessages((prev) => [...prev, `AI: ${chatResponse.response}`]); // Adds AI's response
    } catch (error:any) {
      console.error("Error continuing chat:", error);
      openNotification("error", error.message);
      setChatMessages((prev) => [...prev, "AI: Error responding."]); // Error handling for failed responses
    }

    setUserMessage(""); // Clears input field after sending message
  };

  const handleExitChat = () => {
    setChatExited(true); // Marks the chat as exited
  };

  return (
    <div className="container">
      {/* Show back icon only when satisfaction is answered */}
      {satisfactionAnswered && (
        <LeftCircleTwoTone
          onClick={() => navigate("/dashboard")}
          className="back-icon"
        />
      )}
      <img
        src="/images/Logo.png"
        alt="MoodBuddy Logo"
        className="logo-corner"
      />
      <p>
        You are currently in a {moodType} Mood {moodIcon[moodType]}
      </p>
      <div
        className="feedback-box"
        style={{ backgroundColor: moodColors[moodType] || "white" }}
      >
        {/* Chat Section */}
        <div className="chat-messages">
          {chatMessages.length > 0 ? (
            chatMessages.map((message, index) => <p key={index}>{message}</p>)
          ) : (
            <p>{moodType} feedback</p> // Show this only if chat is empty
          )}
        </div>

        {/* Chat Input - Shown Only If Chat Is Active */}
        <div className="chat-input">
          <Input
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onPressEnter={handleSendMessage}
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>

      {/* Exit Chat Button - Visible After Starting Chat */}
      {!chatExited &&
        chatMessages.length > 0 && ( // Show the exit chat button after the chat starts
          <Button onClick={handleExitChat} style={{ marginTop: "20px" }}>
            Exit Chat
          </Button>
        )}

      {/* Feedback Section - Shown Only After Chat Ends */}
      {chatExited && (
        <div className="feedback-form">
          <p>Are you satisfied with the feedback you received?</p>

          <div className="feedback-icons">
            <div
              className="thumb-icon"
              onClick={() => setSatisfactionAnswered(true)}
            >
              <LikeTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "32px" }}
              />
              <div className="thumb-text">Yes</div>
            </div>

            <div
              className="thumb-icon"
              onClick={() => setSatisfactionAnswered(true)}
            >
              <DislikeTwoTone
                twoToneColor="#ff0a0a"
                style={{ fontSize: "32px" }}
              />
              <div className="thumb-text">No</div>
            </div>
          </div>

          <p>Any ideas for improvement?</p>
          <Input placeholder="Type your suggestions..." />
        </div>
      )}
    </div>
  );
};
export default MoodFeedback;
