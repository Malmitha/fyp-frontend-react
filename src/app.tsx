import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./welcome/welcome";
import SignInPage from "./sign-in/signin"; 
import SignUpPage from "./sign-up/signup"; 
import DashboardPage from "./dashboard/dashboard"; 
import PredictionPage from "./prediction/prediction"; 
import FeedbackPage from "./feedback/feedback"; 
import HistoryPage from "./history/history"; 
import UpdateProfilePage from "./update-profile/updateProfile"; 
import UpdateCredentialsPage from "./update-credentials/updateCredentials"; 
import TabCloseLogout from "dashboard/component/tabCloseLogout";


const App: React.FC = () => {
  
  return (
    <Router>
      <TabCloseLogout />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/feedback" element={<FeedbackPage/>} />
        <Route path="/analytics" element={<HistoryPage/>} />
        <Route path="/update-profile" element={<UpdateProfilePage/>} />
        <Route path="/update-credentials" element={<UpdateCredentialsPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
