import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const routeTitles: Record<string, string> = {
  "/home": "Home",
  "/dashboard": "Dashboard",
  "/appointment": "Appointments",
  "/appointment/add": "Add Appointment",
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

const MobileHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  let currentTitle = routeTitles[location.pathname] || "Dashboard";
  if (location.pathname.startsWith("/patients/")) {
    currentTitle = decodeURIComponent(location.pathname.split("/")[2]) || "Patient";
  }

  const goToProfile = () => navigate("/my-profile");
  const goToHome = () => navigate("/dashboard");

  return (
    <div className="relative w-full shrink-0 bg-gray-100">
    <header className="flex items-center w-full min-w-0 h-14 px-2 py-2 gap-2">
      {/* Dark M logo - prominent left block */}
      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-900 text-white font-bold text-lg shrink-0 shadow-md">
        M
      </div>

      {/* Single white card: icon, title, home, dots, profile */}
      <div className="flex-1 min-w-0 flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-100 h-11 px-3 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            src="/images/fi_calendar.svg"
            alt=""
            className="w-5 h-5 shrink-0 opacity-70"
          />
          <h1 className="text-base font-semibold text-gray-800 truncate">
            {currentTitle}
          </h1>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={goToHome}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Home"
          >
            <img src="/images/fi_home.svg" alt="Home" className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            aria-label="Menu"
          >
            <span className="text-gray-600 text-sm leading-none">⋯</span>
          </button>
          <button
            type="button"
            onClick={goToProfile}
            className="shrink-0 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            aria-label="Profile"
          >
            <img
              src="/images/Ellipse 1.svg"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Dropdown menu when three dots clicked */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-full left-2 right-2 mt-1 bg-white shadow-lg rounded-xl z-50 overflow-hidden border border-gray-100 max-h-[70vh] overflow-y-auto">
            {mobileMenuItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  navigate(item.path);
                  setShowMenu(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  location.pathname === item.path ? "bg-blue-50 text-blue-600" : "text-gray-800"
                }`}
              >
                <img src={item.icon} alt="" className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </header>
    </div>
  );
};

export default MobileHeader;
