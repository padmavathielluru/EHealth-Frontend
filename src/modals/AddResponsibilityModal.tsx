import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/commonComponents/YearCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { responsibilitySchema, ResponsibilityFormType } from "../components/commonComponents/schema";

interface AddResponsibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
   onAdd: (data: ResponsibilityFormType) => void;
}

const AddResponsibilityModal: React.FC<AddResponsibilityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  // const [startYear, setStartYear] = useState("");
  // const [endYear, setEndYear] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");

  const {
          setValue,
          watch,
          register,
          formState: { errors },
          // handleSubmit,
      } = useForm<ResponsibilityFormType>({
          resolver: zodResolver(responsibilitySchema),
          defaultValues: {
              startYear: "",
              endYear: "",
          },
      });

  if (!isOpen) return null;

  // const onSubmit = (data: ResponsibilityFormType) => {
  //   onAdd(data);
  //   onClose();
  // };

  // const handleAdd = () => {
  //   onAdd({ endYear });
  //   onClose();
  // };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[685px] h-[560px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">
       <div className="flex items-center justify-between mb-4">
                    <Title text="Add Responsibility" />
                <button onClick={onClose}
                    className=" w-8 h-8 flex items-center justify-center">
                    <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                </button> 
                </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <input
          {...register("role" as any)}
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
          {...register("institution" as any)}
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
             <YearCalendar
                           value={watch("startYear")}
                            onChange={(val) => setValue("startYear", val, {shouldValidate: true})}
                errorMessage={errors.startYear?.message as string}/>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">To (Year)</label>
             <YearCalendar
                            value={watch("endYear")}
                            onChange={(val) => setValue("endYear", val, {shouldValidate: true})}
                errorMessage={errors.endYear?.message as string}
                        />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">
            Key Responsibilities
          </label>
          <textarea
            {...register("keyResponsibilities" as any)}
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

export default AddResponsibilityModal;
