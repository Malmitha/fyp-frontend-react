import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Form,
  Typography,
  notification,
  Select,
  DatePicker,
} from "antd";
import "../style/signup.css";
import "../style/style.css";
import dayjs from "dayjs";
import { UpdateProfileResponse } from "./models/updateProfileResponse";
import { getProfile, updateProfile } from "./service/updateProfileService";
import { UpdateProfileRequest } from "./models/updateProfileRequest";
import { useNavigate } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const UpdateProfile: React.FC = () => {
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

        // Extracting hobbies and activities as string arrays
        const hobbiesList = response.responseBody.hobbies.map(
          (hobby) => hobby.hobby
        );
        const activitiesList = response.responseBody.activities.map(
          (activity) => activity.activity
        );

        // Set form values when data is fetched
        form.setFieldsValue({
          firstName: response.responseBody.profile.firstName,
          lastName: response.responseBody.profile.lastName,
          age: response.responseBody.profile.age,
          dateOfBirth: dayjs(
            response.responseBody.profile.dateOfBirth,
            "YYYY-MM-DD"
          ),
          nickName: response.responseBody.profile.nickname,
          email: response.responseBody.profile.email,
          occupation: response.responseBody.profile.occupation,
          gender: response.responseBody.profile.gender,
          hobbies: hobbiesList,
          happyActivities: activitiesList,
        });
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [userId]);

  const updateUserProfile = async (values: UpdateProfileRequest) => {
    setLoading(true);

    try {
      const response: UpdateProfileResponse = await updateProfile(
        userId,
        values
      );
      openNotification("success", "User profile updated successfully!");

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
        Update Your Profile !!!
      </Title>
      <LeftCircleTwoTone
        onClick={() => navigate("/dashboard")}
        className="back-icon"
      />
      <Form form={form} onFinish={updateUserProfile} className="signup-form">
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
              <Input placeholder="First Name" disabled/>
            </Form.Item>

            <div className="inline-fields">
              <Form.Item
                label="Age:"
                name="age"
                rules={[{ required: true, message: "Enter your age" }]}
                className="age-field"
              >
                <Input placeholder="Age" disabled/>
              </Form.Item>

              <Form.Item
                label="Date of Birth:"
                name="dateOfBirth"
                rules={[{ required: true, message: "Select your birth day" }]}
                className="dob-field"
              >
                <DatePicker placeholder="dateOfBirth" format="DD/MM/YYYY" disabled />
              </Form.Item>
            </div>

            <Form.Item
              label="Nickname:"
              name="nickName"
              rules={[
                { required: true, message: "Please enter your nick name" },
              ]}
            >
              <Input placeholder="NickName" />
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
              <Input placeholder="Last Name" disabled/>
            </Form.Item>

            <Form.Item
              label="Gender:"
              name="gender"
              rules={[{ required: true, message: "Select gender" }]}
            >
              <Select placeholder="Gender" disabled >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
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
        <Form.Item>
          <div className="signup-button-container">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="signup-button"
            >
              Update my Profile
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProfile;
