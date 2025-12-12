import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/YearCalendar";

interface AddResponsibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    role: string;
    institution: string;
    startYear: string;
    endYear: string;
    keyResponsibilities: string;
  }) => void;
}

const AddResponsibilityModal: React.FC<AddResponsibilityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd({ role, institution, startYear, endYear, keyResponsibilities });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[685px] h-[560px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
        >
          <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <Title text="Add Responsibility" />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">
            Institution
          </label>
          <input
            type="text"
            placeholder="Institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
          />
        </div>

        <div className="flex gap-9 mb-5">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">From (Year)</label>
            <YearCalendar value={startYear} onChange={setStartYear} />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">To (Year)</label>
            <YearCalendar value={endYear} onChange={setEndYear} />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">
            Key Responsibilities
          </label>
          <textarea
            placeholder="Key Responsibilities"
            value={keyResponsibilities}
            onChange={(e) => setKeyResponsibilities(e.target.value)}
            className="w-full mt-1 h-[80px] rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-blue-400 resize-none"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 h-[40px] rounded-xl border text-gray-500 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 h-[40px] rounded-xl bg-blue-500 text-white hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResponsibilityModal;
