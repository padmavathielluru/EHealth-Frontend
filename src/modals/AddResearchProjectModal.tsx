import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/YearCalendar";

interface AddResearchProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    role: string;
    institution: string;
    startYear: string;
    endYear: string;
    keyResearchProject: string;
  }) => void;
}

const AddResearchProjectModal: React.FC<AddResearchProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [role, setRole] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [keyResearchProject, setKeyResearchProject] = useState("");

  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isFundingOpen, setIsFundingOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
const [selectedFunding, setSelectedFunding] = useState("");


  const roleOptions = ["Principal Investigator", "Co-Investigator","Research Assistant"];
  const fundingOptions = ["WHO","ICMR","DST","SERB","UGC"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[704px] h-[643px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
        >
          <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <Title text="Add Research Projects" />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-500">Project Title</label>
          <input
            type="text"
            placeholder="Title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-500">
            Role
          </label>
          <div 
          className="w-full mt-1 h-[40px] rounded-xl border px-3 text-sm flex items-center justify-between curcor-pointer"
          onClick={() => setIsRoleOpen(!isRoleOpen)}>
            <span className="text-gray-400">{selectedRole || "Select Role"}</span>
            <img
              src="/images/fi_chevron-down.svg"
              className={`w-5 h-5 transition-transform ${isRoleOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isRoleOpen && (
            <div className="absolute z-20 bg-white border border-gray-200 rounded-xl mt-1 w-full shadow-md">
              {roleOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedRole(option);
                    setIsRoleOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
         </div>

         <div className="mb-5 relative">
          <label className="text-sm font-medium text-gray-500">
            Funding Agency
          </label>
           <div
            className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm flex items-center justify-between cursor-pointer"
            onClick={() => setIsFundingOpen(!isFundingOpen)}
          >
            <span className="text-gray-400">
              {selectedFunding || "Select Funding Agency"}
            </span>

            <img
              src="/images/fi_chevron-down.svg"
              className={`w-5 h-5 transition-transform ${isFundingOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isFundingOpen && (
            <div className="absolute z-20 bg-white border border-gray-200 rounded-xl mt-1 w-full shadow-md">
              {fundingOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedFunding(option);
                    setIsFundingOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-12 mb-5">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">From (Year)</label>
            <YearCalendar value={startYear} onChange={setStartYear} />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">To (Year)</label>
            <YearCalendar value={endYear} onChange={setEndYear} />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-500">
            Summary
          </label>
          <textarea
            placeholder="Summary"
            value={keyResearchProject}
            onChange={(e) => setKeyResearchProject(e.target.value)}
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
            // onClick={handleAdd}
            className="px-4 py-2 h-[40px] rounded-xl bg-blue-500 text-white hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResearchProjectModal;
