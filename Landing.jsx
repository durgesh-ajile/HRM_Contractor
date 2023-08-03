import React from "react";
import { Route, Routes } from "react-router-dom";
import ReactBigCalendar from "./src/Pages/Calenders/Calender";
import Profile from "./src/Component/profile/Profile";
import ResponsiveDrawer from "./src/Component/SIdebar/Sidebar";

const Landing = () => {
  return (
    <div className="landing">
      <ResponsiveDrawer />
      <div className="right-container">
        <Routes>
          <Route path="/calender" element={<ReactBigCalendar />} />
          <Route path="/profile/:contractorId" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Landing;
