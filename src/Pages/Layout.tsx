import { Outlet } from "react-router-dom";
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from "../components/Header";

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    return (
        <div className="flex flex-col min-h-screen">
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-grow">
                <Sidebar isOpen={isSidebarOpen} />

                <div className="flex-1 p-4">
                    <Outlet></Outlet>
                </div></div></div>
    )
}
export default Layout