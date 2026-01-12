import React, { useEffect } from "react";
import Linegraph from  "../components/Linegraph";
import Cards from "../components/cards";
import DashboardCards from "../components/DashboardCards";
import WelcomeHeader from "../components/dashboardComponents/WelcomeHeader";

const Dashboard: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="p-2">
            <WelcomeHeader />

            <div className="mt-4">
                <Cards />
            </div>

            <div className="mt-4">
                <DashboardCards />
            </div>

            <div className="mt-4">
                <Linegraph />
            </div>
        </div>
    );
};

export default Dashboard;