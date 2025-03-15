import React, { useEffect, useState } from "react";
import "../style/style.css";
import "../style/stylingMoodLogs.css";
import { Slider, Button, Form, Input, notification, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { createDailyLog } from "./service/predictionService";
import { CreateDailyLogRequest } from "./models/createDailyLogRequest";
import { useNavigate } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";

const Prediction: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // To navigate to another page
  const [form] = Form.useForm();

  useEffect(() => {
    // Retrieve userId from sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(() => Number(storedUserId)); // Ensures latest update
    }
  }, []);

  useEffect(() => {
    console.log("Updated userId:", userId);
  }, [userId]);

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "Log Creation Failed",
      description: message,
      placement: "topRight",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Form validation failed:", errorInfo);
    const values = form.getFieldsValue(); // Manually get the form values
    openNotification("error", "Form validation failed!");
  };

  const onPredict = async (values: CreateDailyLogRequest) => {
    if (!userId) return;
    setLoading(true);
    const userData: CreateDailyLogRequest = {
      userId: userId,
      workHours: Number(values.workHours),
      socialHours: Number(values.socialHours),
      entertainmentHours: Number(values.entertainmentHours),
      sleepHours: Number(values.sleepHours),
      stressLevel: Number(values.stressLevel),
      physicalActivityLevel: Number(values.physicalActivityLevel),
      sleepQuality: Number(values.sleepQuality),
      wellBeingScore: Number(values.wellBeingScore),
    };
    try {
      const response = await createDailyLog(userData);
      sessionStorage.setItem("moodType", response.responseBody.moodLog.type);

      openNotification("success", "Daily Log created successfully!");

      // Navigate to Feedback screen and pass mood as a state
      setTimeout(() => {
        navigate("/feedback");
      }, 2000);
    } catch (error: any) {
      console.error("Daily Log creation failed:", error.message);
      openNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-predict">
      <img
        src="/images/Logo.png"
        alt="MoodBuddy Logo"
        className="logo-cornerBig"
      />
      <Title level={3} className="welcome-text">
        Ready to check your Mood ? <br />
        Tell us about your day !! 😊
      </Title>
      <LeftCircleTwoTone
          onClick={() => navigate("/dashboard")}
          className="back-icon"
        />
      <p>
        Today is,{" "}
        <strong>
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </strong>
      </p>

      <Form
        form={form}
        onFinish={onPredict}
        onFinishFailed={onFinishFailed} // Ensure this function is added to capture validation failures
        className="mood-form"
      >
        <Row gutter={[24, 16]} justify="start">
          {/* Header */}
          <Col span={24}>
            <p
              className="form-label"
              style={{
                textAlign: "left",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Enter the time you spent
            </p>
          </Col>

          {/* Left Column: Labels (Time Inputs) */}
          <Col span={12}>
            <Form.Item label="On Work:" className="form-label" />
          </Col>
          <Col span={12}>
            <Form.Item
              name="workHours"
              rules={[{ required: true, message: "Please enter the hours" }]}
            >
              <Input
                type="number"
                placeholder="Hours"
                className="small-input"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="On Social Media and Social Activities:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="socialHours"
              rules={[{ required: true, message: "Please enter the hours" }]}
            >
              <Input
                type="number"
                placeholder="Hours"
                className="small-input"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="On Entertainment:" className="form-label" />
          </Col>
          <Col span={12}>
            <Form.Item
              name="entertainmentHours"
              rules={[{ required: true, message: "Please enter the hours" }]}
            >
              <Input
                type="number"
                placeholder="Hours"
                className="small-input"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="How many hours of sleep you had last night:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="sleepHours"
              rules={[{ required: true, message: "Please enter the hours" }]}
            >
              <Input
                type="number"
                placeholder="Hours"
                className="small-input"
              />
            </Form.Item>
          </Col>

          {/* New Section Header */}
          <Col span={24}>
            <p
              className="form-label"
              style={{
                textAlign: "left",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Rate your experience
            </p>
          </Col>

          {/* Left Column: Labels (Sliders) */}
          <Col span={12}>
            <Form.Item
              label="Your Current Stress Level:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="stressLevel"
              rules={[
                { required: true, message: "Please select your stress level" },
              ]}
            >
              <Slider min={0} max={10} className="wide-slider" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="How can you rate your Sleep Quality:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="sleepQuality"
              rules={[
                { required: true, message: "Please select your sleep quality" },
              ]}
            >
              <Slider min={0} max={10} className="wide-slider" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="How can you rate your well-being:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="wellBeingScore"
              rules={[
                {
                  required: true,
                  message: "Please select your well being level",
                },
              ]}
            >
              <Slider min={0} max={10} className="wide-slider" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="How can you rate your physical activity level:"
              className="form-label"
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="physicalActivityLevel"
              rules={[
                {
                  required: true,
                  message: "Please select your physical activity level",
                },
              ]}
            >
              <Slider min={0} max={10} className="wide-slider" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="mood-submit-button"
          >
            Check My Mood
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Prediction;
