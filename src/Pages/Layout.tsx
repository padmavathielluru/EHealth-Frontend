import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import Footer from "../components/Footer";

const MOBILE_BREAKPOINT = "(max-width: 767px)";

function getIsMobileLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_BREAKPOINT).matches;
}

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(getIsMobileLayout);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen min-w-0 w-full bg-gray-100 transition-all duration-300 overflow-x-hidden">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <Header
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
      )}

      <div className="flex flex-grow min-w-0 w-full transition-all duration-300">
        {!isMobile && (
          <Sidebar
            isOpen={isSidebarOpen}
            onExpandChange={(expanded: boolean) => setSidebarExpanded(expanded)}
          />
        )}
        <div
          className={`flex-1 min-w-0 w-full transition-all duration-300 ${
            isMobile ? "ml-0" : sidebarExpanded ? "ml-[180px]" : "ml-[60px]"
          }`}
        >
          <div className="min-w-0 w-full flex-1">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;