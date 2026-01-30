import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/commonComponents/YearCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { responsibilitySchema, ResponsibilityFormType } from "../schemas/schema";

interface AddResearchProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
   onAdd: (data: ResponsibilityFormType) => void;
}

const AddResearchProjectModal: React.FC<AddResearchProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [role, setRole] = useState("");
  const [keyResearchProject, setKeyResearchProject] = useState("");

   const {
            setValue,
            watch,
            formState: { errors },
        } = useForm<ResponsibilityFormType>({
            resolver: zodResolver(responsibilitySchema),
            defaultValues: {
                startYear: "",
                endYear: "",
            },
        });

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
        <div className="flex items-center justify-between mb-4">
                    <Title text="Add Research Project" />
                <button onClick={onClose}
                    className=" w-8 h-8 flex items-center justify-center">
                    <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                </button> 
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
              src="/images/fi_chevron-down.svg" alt="down"
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
              src="/images/fi_chevron-down.svg" alt="down"
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
             <YearCalendar
                           value={watch("startYear")}
                            onChange={(val) => setValue("startYear", val, {shouldValidate: true})}
                errorMessage={errors.startYear?.message}
                        />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">To (Year)</label>
            <YearCalendar
                            value={watch("endYear")}
                            onChange={(val) => setValue("endYear", val, {shouldValidate: true})}
                errorMessage={errors.endYear?.message}
                        />
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
