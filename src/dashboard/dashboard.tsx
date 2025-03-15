import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../style/style.css";
import "../style/stylingDashboard.css";
import { getProfile, userSignout } from "./service/dashboardService";
import { Dropdown, MenuProps, message, Modal, notification } from "antd";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [loginTime, setLoginTime] = useState<string | null>(null);

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
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
    const storedLoginTime = sessionStorage.getItem("loginTime");
    if (storedLoginTime) {
      const localTime = new Date(storedLoginTime).toLocaleTimeString("en-IN", {
        hour12: false, // Use 24-hour format
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 1, // No milliseconds or fractional seconds
        timeZone: "Asia/Kolkata", // Convert to Asia/Kolkata time zone (UTC+05:30)
      });
    
      // Set seconds and milliseconds to 00, and append 6 zeros for microseconds
      const formattedTime = localTime.slice(0, 5) + ':00.000000';  // "HH:mm:00.000000"

      setLoginTime(formattedTime);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const getUserDetails = async () => {
      try {
        const response = await getProfile(userId);

        setNickname(response.responseBody.profile.nickname);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [userId]);

  const handleSignOut = async () => {
    Modal.confirm({
      title: "Sign Out",
      content: "Are you sure you want to sign out?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          if (!userId || !loginTime) {
            message.error("User session data is missing.");
            return;
          }

          await userSignout(userId, loginTime);
          openNotification("success", "Signed out successfully!");

          sessionStorage.clear();
          navigate("/");
        } catch (error: any) {
          console.error("Error signing out", error.message);
          openNotification("error", error.message);
        }
      },
    });
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "updateProfile",
      label: (
        <span onClick={() => navigate("/update-profile")}>Update Profile</span>
      ),
    },
    {
      key: "updateCredentials",
      label: (
        <span onClick={() => navigate("/update-credentials")}>
          Update Credentials
        </span>
      ),
    },
    {
      key: "signOut",
      label: <span onClick={handleSignOut}>Sign Out</span>,
    },
  ];

  return (
    <div className="container">
      <img
        src="/images/Logo.png"
        alt="MoodBuddy Logo"
        className="logo-cornerBig"
      />

      <h2 className="text">
        Hii {nickname ? nickname : "User"} !!! <br /> <br /> Welcome back !!!!
      </h2>

      <div className="button-container">
        <div className="button" onClick={() => navigate("/prediction")}>
          Check My Mood
        </div>
        <div className="button" onClick={() => navigate("/analytics")}>
          View My History
        </div>
      </div>

      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="profile-icon">
          <UserOutlined className="user-icon" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Dashboard;
