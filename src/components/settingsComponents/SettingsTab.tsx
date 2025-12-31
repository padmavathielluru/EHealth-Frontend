import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectSettingsTab,SettingsTabType,} from "../../store/settingsSlice";

import GeneralSettingsTab from "./tabs/GeneralSettingsTab";
import ResetPasswordTab from "./tabs/ResetPasswordTab";
import BillingPaymentSettingsTab from "./tabs/BillingPaymentSettingsTab";

const tabs: { key: SettingsTabType; label: string }[] = [
  { key: "general", label: "General Settings" },
  { key: "reset", label: "Reset Password" },
  { key: "billing", label: "Billing & Payment Settings" },
];

const SettingsTab: React.FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.settings.selectedTab
  );

  return (
    <>
      <div className="flex bg-gray-200 p-1 rounded-full w-fit shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => dispatch(selectSettingsTab(tab.key))}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab.key ? "bg-white text-gray-900" : " text-gray-500" }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "general" && <GeneralSettingsTab />}
        {activeTab === "reset" && <ResetPasswordTab />}
        {activeTab === "billing" && <BillingPaymentSettingsTab />}
      </div>
    </>
  );
};

export default SettingsTab;
