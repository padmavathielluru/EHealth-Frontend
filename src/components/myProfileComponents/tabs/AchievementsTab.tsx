import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import { getAchievements } from "../../../services/achievementsTabService";
import { Achievement } from "../../../interfaces/achievementsTabInterface";
import AddAchievementModal from "../../../modals/AddAchievementModal";

const AchievementsTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        const data = await getAchievements();
        setAchievements(data);
    };

    return (
        <div>

            <div className="flex items-center gap-4 mb-2">
                <Title text="Achievements" />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition">
                    <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4 pr-2 pt-3 pl-2 bg-blue-50 h-[111vh] rounded-xl overflow-y-auto">

                {achievements.map((item) => (
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



                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                    <img
                                        src="/images/Group(1).svg"
                                        alt="book"
                                        className="w-6 h-6"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold max-w-[500px]">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-500">{item.year}</p>
                                </div>
                            </div>


                        </div>

                        <div className="mt-6 border p-6 h-[117px] bg-white">
                            <p className="text-sm font-semibold text-gray-600 mb-5">SUMMARY</p>
                            <p className="text-gray-800 leading-relaxed">{item.summary}</p>
                        </div>
                    </div>
                ))}

            </div>
            <AddAchievementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AchievementsTab;
