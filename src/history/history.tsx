import React, { useEffect, useState } from "react";
import { Calendar, Badge, notification } from "antd";
import { Dayjs } from "dayjs";
import "antd/dist/reset.css";
import "../style/style.css";
import "../style/stylingHistory.css";
import Title from "antd/es/typography/Title";
import { getDailyLogs } from "./service/historyService";
import { DailyLogs, MoodLogs } from "./models/getDailyLogsResponse";
import { useNavigate } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";

const MoodHistory: React.FC = () => {
  const navigate = useNavigate(); // To navigate to another page
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  // const [userId, setUserId] = useState<number | null>(null);
  const [loggedDays, setLoggedDays] = useState<string[]>([]);
  const [moodLogs, setMoodLogs] = useState<MoodLogs[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLogs[]>([]);
  const [selectedLog, setSelectedLog] = useState<{
    daily: DailyLogs | null;
    mood: MoodLogs | null;
  }>({ daily: null, mood: null });
  const [userId, setUserId] = useState<number | null>();

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: type === "success" ? "Success" : "User data loading Failed",
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

    const fetchLogs = async () => {
      try {
        const response = await getDailyLogs(userId);
        setLoggedDays(response.responseBody.dates);
        setDailyLogs(response.responseBody.dailyLogs);
        setMoodLogs(response.responseBody.moodLogs);
      } catch (error:any) {
        console.error("Error fetching logs", error.message);
        openNotification("error", error.message);
      }
    };

    fetchLogs();
  }, [userId]);

  const moodColors: Record<string, string> = {
    Positive: "rgb(204, 255, 204)",
    Negative: "rgb(178, 187, 255)",
    Neutral: "rgb(186, 255, 246)",
  };

  const dateCellRender = (value: Dayjs) => {
    const formattedDate = value.format("YYYY-MM-DD");
    if (loggedDays.includes(formattedDate)) {
      return <Badge color="blue" />;
    }
    return null;
  };

  const moodEmojis = {
    Stressed: "😖",
    "Very Sad": "😭",
    Sad: "😢",
    Down: "😞",
    Unsure: "🤔",
    Okay: "😐",
    Good: "🙂",
    Happy: "😊",
    Excited: "🤩",
    Amazing: "🥳",
  };

  const onSelect = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
  
    // Always update the selected date
    setSelectedDate(date);
  
    // Check if there are logs for the selected date
    const dailyLog = dailyLogs.find((log) => log.date === formattedDate) || null;
    const moodLog = moodLogs.find((log) => log.logDate === formattedDate) || null;
  
    // Update state with logs or set to null if no logs exist
    setSelectedLog({ daily: dailyLog, mood: moodLog });
  };

  return (
    <div className="container">
      <img
        src="/images/Logo.png"
        alt="MoodBuddy Logo"
        className="logo-corner"
      />
      <Title level={1} className="welcome-text">
        Your Mood Journey So Far !! 😊
      </Title>
      <div className="second-title">
        Click on a day and to see your Analytics ✨
      </div>
      <LeftCircleTwoTone
        onClick={() => navigate("/dashboard")}
        className="back-icon"
      />
      {/* Calendar & Analytics Section */}
      <div className={`content-container ${selectedDate ? "expanded" : ""}`}>
        {/* Calendar Section */}
        <div className="calendar-box">
          <Calendar
            cellRender={dateCellRender}
            onSelect={onSelect}
            fullscreen={false}
          />
        </div>

        {/* ✅ Analytics Section: Only Show When a Date is Selected */}
        {selectedDate && (
          <div className="analytics-container">
            <h2 className="analytics-title">
              Analytics for {selectedDate.format("MMMM Do, YYYY")}
            </h2>

            {/* ✅ Display Daily Log Data */}
            {selectedLog.daily ? (
              <div
                className="log-card">
                <h3>📊 Daily Log 📊</h3>
                <p>
                  <strong>Work Hours: </strong> {selectedLog.daily.workHours} hrs
                </p>
                <p>
                  <strong>Social Hours: </strong> {selectedLog.daily.socialHours}{" "}
                  hrs
                </p>
                <p>
                  <strong>Entertainment Hours: </strong>{" "}
                  {selectedLog.daily.entertainmentHours} hrs
                </p>
                <p>
                  <strong>Sleep Hours: </strong> {selectedLog.daily.sleepHours}{" "}
                  hrs
                </p>

                <h3 style={{marginTop: 30}}>🏋️‍♂️ Well-being Factors 🏋️‍♂️</h3>
                <p>
                  <strong>Stress Level: </strong> {selectedLog.daily.stressLevel}{" "}
                  / 10
                </p>
                <p>
                  <strong>Sleep Quality: </strong>{" "}
                  {selectedLog.daily.sleepQuality} / 10
                </p>
                <p>
                  <strong>Physical Activity Level: </strong>{" "}
                  {selectedLog.daily.physicalActivityLevel} / 10
                </p>
                <p>
                  <strong>Well-being Score: </strong>{" "}
                  {selectedLog.daily.wellBeingScore} / 10
                </p>
              </div>
            ) : (
              <p className="log-message">No daily log entered for this date.</p>
            )}

            {/* ✅ Display Mood Log Data */}
            {selectedLog.mood ? (
              <div
                className="mood-card"
                style={{
                  backgroundColor: moodColors[selectedLog.mood.type] || "white",
                }}
              >
                <h3>✨ Mood Outcome ✨</h3>
                <p>
                  <strong>Mood Detected: </strong>{" "} {selectedLog.mood.category}{" "}
                  {moodEmojis[
                    selectedLog.mood.category as keyof typeof moodEmojis
                  ] || "❓"}
                </p>
                <p>
                  <strong>Mood Type: </strong>{" "} {selectedLog.mood.type}
                </p>
              </div>
            ) : (
              <p className="log-message">No mood log entered for this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;
