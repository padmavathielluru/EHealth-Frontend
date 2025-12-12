import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import { responsibilitiesTabService } from "../../../services/responsibilitiesTabService";
import { Responsibilities } from "../../../interfaces/responsibilitiesTabInterface";
import AddResponsibilityModal from "../../../modals/AddResponsibilityModal";

const ResponsibilitiesTab = () => {
    const [responsibilities, setResponsibilities] = useState<Responsibilities[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadResponsibilities();
    }, []);

    const loadResponsibilities = async () => {
        const data = await responsibilitiesTabService.getStudies();
        const mapped = data.map(item => ({
            ...item,
            startYear: item.startYear,
            endYear: item.endYear
        }));
        setResponsibilities(data);
    };

    const handleAddResponsibility = (newData: any) => {
        setResponsibilities(prev => [...prev, {
            id: Date.now(),
            ...newData
        }]);
        setIsModalOpen(false)
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-2">
                <Title text="Responsibilities" />

                <button onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition"
                >
                    <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4 pr-2 pt-3 pl-2  bg-blue-50 h-[111vh] rounded-xl overflow-y-auto">

                {responsibilities.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 relative"
                    >
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                            <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                <img src="/images/fi_edit-2.svg" alt="edit" className="w-4 h-4" />
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                <img src="/images/u_trash.svg" alt="delete" className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-6 mb-2">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                    <img
                                        src="/images/Group(1).svg"
                                        alt="book"
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-700">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.startYear} - {item.endYear || "PRESENT"}</p>
                                </div>
                            </div>


                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="border  p-3 items-center flex gap-6 bg-white">
                                <span className="text-xs font-semibold text-gray-500 w-32">
                                    INSTITUTION
                                </span>
                                <span className="text-gray-700 text-sm truncate">{item.institution}</span>
                            </div>

                            <div className="border p-3 flex items-center gap-6 bg-white">
                                <span className="text-xs font-semibold text-gray-500 w-32">
                                    RESPONSIBILITIES
                                </span>
                                <span className="text-gray-700 text-sm truncate">{item.responsibilities}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <AddResponsibilityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddResponsibility}
            />
        </div>
    );
};

export default ResponsibilitiesTab;
