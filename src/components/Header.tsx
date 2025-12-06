import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

interface HeaderProps {
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarExpanded, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/my-profile");
  };

  const routeTitles: Record<string, string> = {
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/appointment": "Appointments",
    "/patients": "My Patients",
    "/referrals": "Referrals",
    "/inbox": "Inbox",
    "/help": "Help",
    "/settings": "Settings",
    "/my-profile": "My Profile",
  };

  const currentPath = location.pathname;

  let currentTitle = routeTitles[currentPath];
  if (!currentTitle) {
    if (currentPath.startsWith("/patients/")) {
      const name = decodeURIComponent(currentPath.split("/")[2]);
      currentTitle = name;
    } else {
      currentTitle = "Dashboard";
    }
  }


  return (
    <header
      className={`bg-gray-100 h-[64px] flex items-center justify-between pl-2 px-[24px] py-[12px] gap-[10px] transition-all duration-300 ${sidebarExpanded ? "ml-[256px]" : "ml-[80px]"
        }`}
    >
      <div className="flex items-center space-x-3">

        <img
          src="/images/fi_sidebar.svg"
          alt="Sidebar Icon"
          onClick={toggleSidebar}   
          className="cursor-pointer object-contain"
          style={{ width: "25px", height: "25px" }}
        />

        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {currentTitle}
        </h1>
        <Breadcrumbs />

      </div>

      <div className="flex items-center space-x-3">
        <div className="p-3 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img src="/images/u_plus.svg" alt="Add Icon" className="w-5 h-5" />
        </div>

        <div className="p-3 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img src="/images/fi_bell.svg" alt="Notification" className="w-5 h-5" />
        </div>

        <img
          src="/images/Ellipse 1.svg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={goToProfile}
        />
      </div>
    </header>
  );
};

export default Header;
