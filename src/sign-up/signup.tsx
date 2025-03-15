import React, { useState } from "react";
import {Input, Button, Form, Typography, notification, Select, DatePicker, MenuProps, Tooltip,} from "antd";
import "../style/signup.css";
import "../style/style.css";
import { SignUpRequest } from "./models/signupRequest";
import { SignUpResponse } from "./models/signupResponse";
import { createUser } from "./service/signupService";
import dayjs from "dayjs";
import { InfoCircleOutlined } from "@ant-design/icons";


const { Title } = Typography;
const { Option } = Select;

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "Sign Up Failed",
      description: message,
      placement: "topRight",
    });
  };

  const occupations = [
    { value: "Accountant", label: "Accountant" },
    { value: "Doctor", label: "Doctor" },
    { value: "Engineer", label: "Engineer" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Lawyer", label: "Lawyer" },
    { value: "Manager", label: "Manager" },
    { value: "Nurse", label: "Nurse" },
    { value: "Sales Representative", label: "Sales Representative" },
    { value: "Sales Person", label: "Sales Person" },
    { value: "Scientist", label: "Scientist" },
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" },
  ];

  
  const onSignUp = async (values: SignUpRequest) => {
    setLoading(true);
    const formattedValues: SignUpRequest = {
      ...values,
      age: Number(values.age), // Convert age to a number
      dateOfBirth: dayjs(values.dob).format("DD-MM-YYYY"),
    };
    
    try {
      const response: SignUpResponse = await createUser(formattedValues);
      openNotification("success", "User profile created successfully!");

      // Redirect to sign in after success
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (error: any) {
      console.error("Sign Up failed:", error.message);
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
        className="signUp-logo"
      />
      <Title level={3} className="welcome-text">
        Hey !!! Ready to join with us on this journey ?
      </Title>
      <Form onFinish={onSignUp} className="signup-form">
        <div className="form-layout">
          {/* Left Side */}
          <div className="form-left">
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Nickname:"
              name="nickName"
              rules={[
                { required: true, message: "Please enter your nick name" },
              ]}
            >
              <Input placeholder="NickName" />
            </Form.Item>

            <div className="inline-fields">
              <Form.Item
                label="Age:"
                name="age"
                rules={[{ required: true, message: "Enter your age" }]}
                className="age-field"
              >
                <Input placeholder="Age" />
              </Form.Item>

              <Form.Item
                label="Date of Birth:"
                name="dateOfBirth"
                rules={[{ required: true, message: "Select your birth day" }]}
                className="dob-field"
              >
                <DatePicker placeholder="dateOfBirth" format="DD/MM/YYYY" />
              </Form.Item>
            </div>

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
              label={
                <span>
                  Password
                  <Tooltip title="Must include at least one uppercase, one lowercase, one number, and one special character.">
                    <InfoCircleOutlined style={{ color: "#888", marginLeft: 5 }} />
                  </Tooltip>
                </span>
              }
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password:"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[{ required: true, message: "Confirm your password" }]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </div>

          {/* Right Side */}
          <div className="form-right">
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="Email:"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Gender:"
              name="gender"
              rules={[{ required: true, message: "Select gender" }]}
            >
              <Select placeholder="Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Occupation:"
              name="occupation"
              rules={[
                { required: true, message: "Please select your occupation" },
              ]}
            >
              <Select placeholder="Select your occupation">
                {occupations.map((occupation) => (
                  <Select.Option
                    key={occupation.value}
                    value={occupation.value}
                  >
                    {occupation.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Hobbies:"
              name="hobbies"
              rules={[{ required: true, message: "Enter at least one hobby" }]}
            >
              <Select mode="tags" placeholder="Type a hobby and press Enter">
                {/* You can also predefine options if needed */}
              </Select>
            </Form.Item>

            <Form.Item
              label="Happy Activities:"
              name="happyActivities"
              rules={[
                { required: true, message: "Enter at least one activity" },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Type an activity and press Enter"
              ></Select>
            </Form.Item>
          </div>
        </div>

        <p className="info-text">
          We’ll use this information to make your experience as Personalized as
          Possible !!!
        </p>
        <Form.Item>
          <div className="signup-button-container">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="signup-button"
            >
              Create my Profile
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;

