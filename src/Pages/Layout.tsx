import { Outlet } from "react-router-dom";
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300">
            <Header 
            sidebarExpanded={sidebarExpanded}
            toggleSidebar={toggleSidebar} />

            <div className="flex flex-grow transition-all duration-300">
                <Sidebar isOpen={isSidebarOpen}
                    onExpandChange={(expanded: boolean) => setSidebarExpanded(expanded)} />
                
                <div className={`flex-1 p-4 tranistion-all duration-300 ${sidebarExpanded ? "ml-[180px]" : "ml-[60px]" }`}>

                <div className="flex-1 p-4">
                    <Outlet/>
                </div>
                </div>
            </div>
             <Footer />
        </div>
    )
}
export default Layout