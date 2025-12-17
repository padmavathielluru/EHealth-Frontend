import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/commonComponents/YearCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, formSchema } from "../components/commonComponents/schema";


interface AddNewStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewStudyModal: React.FC<AddNewStudyModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [specialization, setSpecialization] = useState("");

    const {
            setValue,
            watch,
            formState: { errors },
        } = useForm<FormSchemaType>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                year: "",
            },
        });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[704px] h-[436px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">

               <div className="flex items-center justify-between mb-4">
                    <Title text="Add New Study" />
                <button onClick={onClose}
                    className=" w-8 h-8 flex items-center justify-center">
                    <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                </button> 
                </div>

                <div className="mb-5">
                    <label className="text-sm font-medium text-gray-600">
                        Degree / Certification
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
                    />
                </div>

                <div className="flex gap-4 mb-5">
                    
                    <div className="flex-1">
                        <label className="text-sm font-medium text-gray-600">
                            Institution Name
                        </label>
                        <input
                            type="text"
                            placeholder="Institution"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
                        />
                    </div>

                    <div className="w-[40%]">
                         <YearCalendar
                            label="Year"
                            value={watch("year")}
                            onChange={(val) => setValue("year", val, {shouldValidate: true})}
                errorMessage={errors.year?.message}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600">
                        Specialization
                    </label>
                    <input
                        type="text"
                        placeholder="Specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full mt-1 h-[40px] rounded-xl border border-gray-200 px-3 text-sm focus:outline-blue-400"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="w-[96px] h-[40px] rounded-xl border text-gray-500 hover:bg-gray-100 transition">
                        Cancel
                    </button>

                    <button
                        className="w-[76px] h-[40px] rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewStudyModal;
