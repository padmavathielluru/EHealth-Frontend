import React from "react";
import Title from "../components/Title";
import DashboardTabs from "../components/dashboardComponents/DashboardTabs";

interface YearlySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YearlySummaryModal: React.FC<YearlySummaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[1147px] h-[640px] rounded-2xl shadow-xl flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <div className="flex items-center justify-between p-6">
          <Title text="Yearly Summary" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="">
          <DashboardTabs />
        </div>

        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-600 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearlySummaryModal;
