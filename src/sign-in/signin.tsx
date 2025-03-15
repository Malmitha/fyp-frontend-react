import React, { useState } from "react";
import { Input, Button, Form, Typography, notification } from "antd";
import "../style/stylingLogin.css";
import "../style/style.css";
import { loginUser } from "./service/signinService";
import { SignInRequest } from "./model/signInRequest";
import { SignInResponse } from "./model/signInResponse";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "Login Failed",
      description: message,
      placement: "topRight",
    });
  };

  const onSignIn = async (values: SignInRequest) => {
    setLoading(true);
    try {
      const response: SignInResponse = await loginUser(values);

      const userId = response.responseBody.userId.toString();
      const loginTime = new Date().toISOString(); // Store time in ISO format

      // Store userId in sessionStorage
      sessionStorage.setItem("userId", response.responseBody.userId.toString());
      sessionStorage.setItem("loginTime", loginTime);
      openNotification("success", "Login successful! Redirecting...");

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      openNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="/images/Logo.png" alt="MoodBuddy Logo" className="logo" />
      <Title level={3} className="welcome-text">
        Let's sign in to get started !!!
      </Title>
      <Form onFinish={onSignIn} className="login-form">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-button"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
