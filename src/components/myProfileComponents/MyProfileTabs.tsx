import React, { useState } from "react";
import BasicDetailsTab from "./tabs/BasicDetailsTab";
import StudiesTab from "./tabs/StudiesTab";
import ResponsibilitiesTab from "./tabs/ResponsibilitiesTab";
import AchievementsTab from "./tabs/AchievementsTab";
import MembershipsTab from "./tabs/MembershipsTab";
import ResearchProjectsTab from "./tabs/ResearchProjectsTab";

const tabs = [
    "Basic Details",
    "Studies",
    "Responsibilities",
    "Achievements",
    "Memberships",
    "Research Projects",
];

const ProfileTabs = () => {
    const [ active, setActive] = useState("Basic Details");

    const renderTabContent = () => {
    switch (active) {
        case "Basic Details":
            return <BasicDetailsTab />;
        case "Studies":
            return <StudiesTab />;
        case "Responsibilities":
            return <ResponsibilitiesTab />;
        case "Achievements":
            return <AchievementsTab />;
        case "Memberships":
            return <MembershipsTab />;
        case "Research Projects":
            return <ResearchProjectsTab />;
        default:
            return <BasicDetailsTab />;
    }
};

return (
    <div className="">
        <div className="flex gap-2 bg-gray-200  w-[765px] p-1 rounded-full">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${ active === tab
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-black"
                    }`}>
                        {tab}
                </button>
            ))}
        </div>

        <div className="mt-5 bg-white p-6 rounded-xl shadow-sm">
            {renderTabContent()}
        </div>
    </div>
    );
};

export default ProfileTabs;