import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Appointment from "./Pages/Appointment";
import Home from "./Pages/Home";
import Referrals from "./Pages/Referrals";
import InboxComponent from "./Pages/Inbox";
import Patients from "./Pages/Patients";
import PatientDetails from "./Pages/PatientDetails";
import MyProfile from "./Pages/MyProfile";
import { Inbox } from "@mui/icons-material";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import CreateAccount from "./Pages/CreateAccount";
import VerifyMobileNumber from "./Pages/VerifyMobileNumber";
import OtpVerification from "./Pages/OtpVerification";
import VerifySuccess from "./Pages/VerifySuccess";
import SetupProfile from "./Pages/SetupProfile";
import ProfessionalDetails from "./Pages/ProfessionalDetails";
import DocumentVerification from "./Pages/DocumentVerification";
import AvailabilitySetUp from "./Pages/AvailabilitySetUp";
import ProfileSubmittedSuccess from "./Pages/ProfileSubmittedSuccess";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-mobile" element={<VerifyMobileNumber />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/professional-details" element={<ProfessionalDetails />} />
        <Route path="/document-verification" element={<DocumentVerification />} />
        <Route path="/availability-setup" element={<AvailabilitySetUp />} />
        <Route path="/profile-submitted-success" element={<ProfileSubmittedSuccess />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="inbox" element={<InboxComponent />} />
          <Route path="settings" element={<Settings />} />
          <Route path="home" element={<Home />} />
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

