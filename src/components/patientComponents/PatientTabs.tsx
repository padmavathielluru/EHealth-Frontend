import React, { useState } from "react";
import NotesTab from "./tabs/NotesTab";
import SymptomsTab from "./tabs/SymptomsTab";
import DiagnosisTab from "./tabs/DiagnosisTab";
import MedicationTab from "./tabs/MedicationTab";
import LabReportsTab from "./tabs/LabReportsTab";
import ReferralsTab from "./tabs/ReferralsTab";

const tabs = [
  "Notes",
  "Symptoms",
  "Diagnosis",
  "Medication",
  "Lab Reports",
  "Referrals",
];

const PatientTab = () => {
  const [activeTab, setActiveTab] = useState("Notes");

  const renderTab = () => {
    switch (activeTab) {
      case "Notes":
        return <NotesTab />;
      case "Symptoms":
        return <SymptomsTab />;
      case "Diagnosis":
        return <DiagnosisTab />;
      case "Medication":
        return <MedicationTab />;
      case "Lab Reports":
        return <LabReportsTab />;
      case "Referrals":
        return <ReferralsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="">

      <div className="flex gap-1.5 p-2 rounded-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-900 hover:bg-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="">{renderTab()}</div>
    </div>
  );
};

export default PatientTab;
