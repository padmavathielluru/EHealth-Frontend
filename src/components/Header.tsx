import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { Button, Popover } from "@mui/material";
import AddItemComponent from "./AddItemComponent";
import NotificationsComponent from "./NotificationsComponent";

interface HeaderProps {
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarExpanded, toggleSidebar }) => {
  const location = useLocation();

  const routeTitles: Record<string, string> = {
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/appointment": "Appointments",
    "/patients": "My Patients",
    "/referrals": "Referrals",
    "/inbox": "Inbox",
    "/help": "Help",
    "/settings": "Settings",
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   const [notifEl, setNotifEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClick =   (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotifEl(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const notifOpen = Boolean(notifEl)
  const id = open ? 'simple-popover' : undefined;
  const notifId = notifOpen?'notif-popover':undefined;

  return (
    <header
      className={`bg-gray-100 h-[64px] flex items-center justify-between px-[24px] py-[12px] gap-[10px] transition-all duration-300 ${sidebarExpanded ? "ml-[256px]" : "ml-[80px]"
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
        <div className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <span aria-describedby={id} onClick={handleClick}>
            <img src="/images/u_plus.svg" alt="Add Icon" className="w-5 h-5" />
          </span>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <AddItemComponent />
          </Popover>
        </div>

        <div className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <span aria-describedby={id} onClick={handleNotificationClick}>
            <img src="/images/fi_bell.svg" alt="Notification" className="w-5 h-5" />
          </span>
          <Popover
            id={notifId}
            open={notifOpen}
            anchorEl={notifEl}
            onClose={handleNotifClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <NotificationsComponent />
          </Popover>
        </div>

        <img
          src="/images/Ellipse 1.svg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
