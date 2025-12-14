import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectUserTab,selectConversation } from "../../store/inboxSlice";

const tabs = ["Patients", "Doctors", "Referrals", "Admin"] as const;

const InboxTabs: React.FC = () => {
   const dispatch = useDispatch();
   const selectedTab = useSelector(
    (state: RootState) => state.inbox.selectedTab
  );
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => (dispatch(selectUserTab(tab)),dispatch(selectConversation(tab+'1')))}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            tab === selectedTab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default InboxTabs;
