import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
// import Breadcrumbs from "./components/Breadcrumbs";
import Dashboard from "./Pages/Dashboard";
import Appointment from "./Pages/Appointment";
import Home from "./Pages/Home";
import Referrals from "./Pages/Referrals";
import Patients from "./Pages/Patients";
import PatientDetails from "./Pages/PatientDetails";
import MyProfile from "./Pages/MyProfile";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <div className="flex flex-col bg-gray-100 min-h-screen transition-all duration-300">
        {/* Header */}
        {/* <Header sidebarExpanded={sidebarExpanded} /> */}
        <Header
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />

        <div className="flex flex-grow transition-all duration-300">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onExpandChange={(expanded: boolean) => setSidebarExpanded(expanded)}
          />


          <div
            className={`flex-1 p-4 transition-all duration-300 ${sidebarExpanded ? "ml-[180px]" : "ml-[60px]"
              }`}
          >
            <Routes>

              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />


              <Route path="/appointment" element={<Appointment />} />

              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientDetails />} />

              <Route path="/referrals" element={<Referrals />} />
              
              <Route path="/home" element={<Home />} />

              <Route path="my-profile" element={<MyProfile />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

