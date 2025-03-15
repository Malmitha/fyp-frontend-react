import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Form,
  Typography,
  notification,
  Select,
  Tooltip,
} from "antd";
import "../style/signup.css";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined, LeftCircleTwoTone } from "@ant-design/icons";
import { getProfile, updateCredentials } from "./service/updateCredentialsService";
import { UpdateCredentialsRequest } from "./models/updateCredentialsRequest";
import { UpdateCredentialsResponse } from "./models/updateCredentialsResponse";

const { Title } = Typography;
const { Option } = Select;

const UpdateCredentials: React.FC = () => {
  const navigate = useNavigate(); // To navigate to another page
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(2);
  const [form] = Form.useForm();

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "Update Failed",
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
  }, []);

  useEffect(() => {
    if (!userId) return;

    const getUserDetails = async () => {
      try {
        const response = await getProfile(userId);

        // Set form values when data is fetched
        form.setFieldsValue({
          username: response.responseBody.credentials.username,
        });

      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    getUserDetails();
  }, [userId]);

  const updateUserCredentials = async (values: UpdateCredentialsRequest) => {
    setLoading(true);

    try {
      const response: UpdateCredentialsResponse = await updateCredentials(
        userId,
        values
      );
      openNotification("success", "User credentials updated successfully!");

      // Redirect to sign in after success
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error: any) {
      console.error("Update failed:", error.message);
      openNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img
        src="/images/Logo.png"
        alt="MoodBuddy Logo"
        className="logo-cornerBig"
      />
      <Title level={1} className="welcome-text">
        Update Your Credentials !!!
      </Title>
      <LeftCircleTwoTone
        onClick={() => navigate("/dashboard")}
        className="back-icon"
      />
      <Form form={form} onFinish={updateUserCredentials} className="signup-form">
        <Form.Item
              label="Username:"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Existing Password:"
              name="oldPassword"
              dependencies={["password"]}
              rules={[{ required: true, message: "Enter your existing password" }]}
            >
              <Input.Password placeholder="Existing Password" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  New Password
                  <Tooltip title="Must include at least one uppercase, one lowercase, one number, and one special character.">
                    <InfoCircleOutlined style={{ color: "#888", marginLeft: 5 }} />
                  </Tooltip>
                </span>
              }
              name="newPassword"
              rules={[{ required: true, message: "Enter your new password" }]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password:"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[{ required: true, message: "Confirm your password" }]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

        <Form.Item>
          <div className="signup-button-container">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="signup-button"
            >
              Update my Credentials
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCredentials;
