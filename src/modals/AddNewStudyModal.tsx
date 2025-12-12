import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/YearCalendar";

interface AddNewStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewStudyModal: React.FC<AddNewStudyModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [year, setYear] = useState<string>("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[704px] h-[436px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center">
                    <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <Title text="Add New Study" />
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
                            label="Year of Publication"
                            value={year}
                            onChange={setYear}
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
