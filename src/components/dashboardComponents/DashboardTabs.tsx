import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectDashboardTab, DashboardTabType, } from "../../store/dashboardTabsSlice";
import TotalPatients from "./tabs/TotalPatientsTab";
import NewPatients from "./tabs/NewPatientsTab";
import Consultations from "./tabs/ConsultationsTab";

const tabs: { key: DashboardTabType; label: string }[] = [
    { key: "total", label: "Total Patients" },
    { key: "new", label: "New Patients" },
    { key: "consultation", label: "Consultations" },
];

const DashboardTabs: React.FC = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector(
        (state: RootState) => state.dashboardTabs.selectedTab
    );

    return (
        <div className="h-full flex flex-col p-2">
            <div className="flex bg-gray-200 p-1 ml-4 rounded-full w-fit shadow-sm">
                {tabs.map((tab) => (
                    <button key={tab.key}
                    onClick={() => dispatch(selectDashboardTab(tab.key))}
                    className={`px-4 py-2 rounded-full text-sm font-medium 
                    ${activeTab === tab.key ? "bg-white text-gray-900" : "text-gray-500"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-0 flex-1 overflow-hidden">
                {activeTab === "total" && <TotalPatients />}
                {activeTab === "new" && <NewPatients />}
                {activeTab === "consultation" && <Consultations />}
            </div>
        </div>
    );
};

export default DashboardTabs;