import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/YearCalendar";

interface AddNewPublicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewPublicationModal: React.FC<AddNewPublicationModalProps> = ({ isOpen, onClose }) => {
    const [year, setYear] = useState<string>("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[760px] h-[584px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">


                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
                >
                    <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                </button>


                <div className="text-xl font-semibold mb-6">
                    <Title text="Add New Publication" />
                </div>


                <div className="mb-4">
                    <label className="text-sm text-gray-600">Title of Paper / Article</label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full mt-1 p-3 border rounded-xl h-[40px] focus:outline-none"
                    />
                </div>
                <div className="flex gap-5 mb-4">

                    <div className="w-[60%]">
                        <label className="text-sm text-gray-600">Journal</label>
                        <input
                            type="text"
                            placeholder="Journal"
                            className="w-full mt-1 p-3 border rounded-xl h-[40px] focus:outline-none"
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


                <div className="mb-4">
                    <label className="text-sm text-gray-600">Co-authors</label>
                    <input
                        type="text"
                        placeholder="Co-authors"
                        className="w-full mt-1 p-3 border rounded-xl h-[40px] focus:outline-none"
                    />
                </div>


                <div className="mb-6">
                    <label className="text-sm text-gray-600">Summary</label>
                    <textarea
                        placeholder="Summary"
                        className="w-full mt-1 p-3 border rounded-xl h-28 focus:outline-none"
                    ></textarea>
                </div>


                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-600 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button className="px-6 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewPublicationModal;
