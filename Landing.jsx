import React from "react";
import { Route, Routes } from "react-router-dom";
import ReactBigCalendar from "./src/Pages/Calenders/Calender";
import Profile from "./src/Component/profile/Profile";
import ResponsiveDrawer from "./src/Component/SIdebar/Sidebar";
import ContractorForm from "./src/Pages/ContractorForm/ContractorForm";

const Landing = () => {
  return (
    <div className="landing">
      <ResponsiveDrawer />
      <div className="right-container">
        <Routes>
          <Route path="/calender" element={<ReactBigCalendar />} />
          <Route path="/" element={<Profile />} />
          <Route path="/contractorform" element={<ContractorForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Landing;
