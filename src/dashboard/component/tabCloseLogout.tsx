import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignout } from "../service/dashboardService";
import { Modal, message } from "antd";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const WARNING_TIMEOUT = 4 * 60 * 1000; // 4 minutes in milliseconds (1 minute before logout)

const UserInactivityLogout: React.FC = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [warningTimer, setWarningTimer] = useState<NodeJS.Timeout | null>(null);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const loginTime = sessionStorage.getItem("loginTime");
      
      if (userId && loginTime) {
        const localTime = new Date(loginTime).toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 1,
          timeZone: "Asia/Kolkata",
        });
        
        const formattedTime = localTime.slice(0, 5) + ':00.000000';
        
        await userSignout(Number(userId), formattedTime);
        sessionStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing out due to inactivity:", error);
    }
  };

  // Reset timers when user is active
  const resetTimers = () => {
    // Clear any existing timers
    if (warningTimer) clearTimeout(warningTimer);
    if (logoutTimer) clearTimeout(logoutTimer);
    
    // Hide warning if shown
    setShowWarning(false);
    
    // Set new timers
    const newWarningTimer = setTimeout(() => {
      setShowWarning(true);
    }, WARNING_TIMEOUT);
    
    const newLogoutTimer = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
    
    setWarningTimer(newWarningTimer);
    setLogoutTimer(newLogoutTimer);
  };

  useEffect(() => {
    // Only set up timers if user is logged in
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;
    
    // Events to track user activity
    const events = [
      'mousedown', 'mousemove', 'keypress', 
      'scroll', 'touchstart', 'click'
    ];
    
    // Initial timer setup
    resetTimers();
    
    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimers);
    });
    
    // Cleanup function
    return () => {
      // Remove event listeners
      events.forEach(event => {
        window.removeEventListener(event, resetTimers);
      });
      
      // Clear timers
      if (warningTimer) clearTimeout(warningTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  // Warning modal
  const warningModal = (
    <Modal
      title="Session Timeout Warning"
      open={showWarning}
      onOk={resetTimers}
      onCancel={() => setShowWarning(false)}
      okText="Keep Session Active"
      cancelText="Logout Now"
      cancelButtonProps={{ onClick: handleLogout }}
    >
      <p>Your session is about to expire due to inactivity. You will be automatically logged out in 1 minute.</p>
      <p>Do you want to continue your session?</p>
    </Modal>
  );

  return (
    <>
      {warningModal}
    </>
  );
};

export default UserInactivityLogout;