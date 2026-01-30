import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import useIsMobile from "../hooks/UseIsMobile";


interface HeaderProps {
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarExpanded, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [activePath, setActivePath] = React.useState<string | null>(null);

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

  const mobileMenuItems = [
    { name: "Dashboard", icon: "/images/fi_grid.svg", path: "/dashboard" },
    { name: "Appointments", icon: "/images/fi_calendar.svg", path: "/appointment" },
    { name: "Patients", icon: "/images/fi_user.svg", path: "/patients" },
    { name: "Help", icon: "/images/fi_help-circle.svg", path: "/help" },
    { name: "Settings", icon: "/images/fi_settings.svg", path: "/settings" },
  ];

  let currentTitle = routeTitles[location.pathname] || "Dashboard";

  const currentPath = routeTitles[location.pathname] || "Dashboard";
  if (!routeTitles[location.pathname] && location.pathname.startsWith("/patients/")) {
    currentTitle = decodeURIComponent(location.pathname.split("/")[2]);
  }

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
      className={` bg-gray-100 h-[64px] flex items-center justify-between pl-2 px-[24px] py-[12px] gap-[10px] transition-all duration-300 
        ${sidebarExpanded && !isMobile ? "ml-[256px]" : "ml-[80px]"
        }`}  
    >
      <div className="flex items-center space-x-3 select-none">
        <img
          src="/images/fi_sidebar.svg"
          alt="Sidebar Icon"
          onClick={() => {
            if (isMobile) {
              setShowMobileMenu(prev => !prev);
            } else {
              toggleSidebar();
            }
          }}
          className="cursor-pointer object-contain"
          style={{ width: "25px", height: "25px" }}
        />

        <h1 className={`text-lg font-semibold text-gray-800 
          ${isMobile ? "whitespace-nowrap" : "truncate"}`}>
          {currentTitle}
        </h1>
        <div className="hidden md:flex">
          <Breadcrumbs />
        </div>

        {isMobile && (
          <div className="relative flex items-center space-x-2">
            <Link to="/dashboard" className="hover:text-[#016BFF] font-medium">
              <img
                src="/images/fi_home.svg"
                alt="Home Icon"
                className="w-3 h-3 text-gray-400 ml-4"
              />
            </Link>
            <img
              src="/images/fi_chevron-right.svg"
              className="w-4 h-4"
              alt=">"
            />
            <button onClick={() => setShowMobileMenu((prev) => !prev)}
              className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-lg leading-none pb-3">...</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 relative">

        <div className="hidden p-3 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img src="/images/u_plus.svg" alt="Add Icon" className="w-5 h-5" />
        </div>

        <div className="hidden p-3 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img src="/images/fi_bell.svg" alt="Notification" className="w-5 h-5" />
        </div>

        <img
          src="/images/Ellipse 1.svg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={goToProfile}
        />

        {isMobile && showMobileMenu && (
          <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-b-xl z-50">
            {mobileMenuItems.map((item) => (
              <div key={item.path}
                onClick={() => {
                  setActivePath(item.path);
                  navigate(item.path);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 border-b last:border-b-0 
                  cursor-pointer transition-all duration-150 ${activePath === item.path ? "bg-blue-100" : ""}`}>
                  <img src={item.icon}
                  alt={item.name}
                  className="w-4 h-4"/>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
