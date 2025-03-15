import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style/style.css";


const WelcomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="container">
      <img src="/images/Logo.png" alt="MoodBuddy Logo" className="logo" />
      <h1 className="text">Welcome to Your Daily Mood Companion !!!</h1>
      <div className="buttons">
        <Button
          type="primary"
          className="button"
          onClick={() => navigate("/signin")} 
        >
          Sign In
        </Button>
        
        <Button
          type="primary"
          className="button"
          onClick={() => navigate("/signup")} 
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
