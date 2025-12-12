import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import { ResearchProjectItem } from "../../../interfaces/researchProjectTabInterface";
import { getResearchProjects } from "../../../services/researchProjectTabService";
import AddResearchProjectModal from "../../../modals/AddResearchProjectModal";

const ResearchProjectsTab = () => {
    const [researchProject, setResearchProject] = useState<ResearchProjectItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const data = getResearchProjects();
        setResearchProject(data);
    }, []);

    return (
        <div>

            <div className="flex items-center gap-4 mb-2">
                <Title text="Research Projects" />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition">
                    <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4 pr-2 pt-3 pl-2 bg-blue-50 h-[111vh] rounded-xl overflow-y-auto">

                {researchProject.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 relative">
                            <div className="flex items-center gap-2 top-2 right-3 absolute ">
                                <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                    <img
                                        src="/images/fi_edit-2.svg"
                                        alt="edit"
                                        className="w-4 h-4"
                                    />
                                </button>

                                <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                    <img
                                        src="/images/u_trash.svg"
                                        alt="delete"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                    <img
                                        src={item.icon}
                                        alt="icon"
                                        className="w-6 h-6"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold max-w-[500px]">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-500">{item.duration}</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-4 border px-4 h-[44px] flex items-center bg-white gap-6">
                            <p className="text-sm font-semibold text-gray-600 w-32">ROLE</p>
                            <p className="text-gray-800">{item.role}</p>
                        </div>

                        <div className="mt-3 border px-4 h-[44px] flex items-center bg-white gap-6">
                            <p className="text-sm font-semibold text-gray-600 w-32">FUNDING AGENCY</p>
                            <p className="text-gray-800">{item.fundingAgency}</p>
                        </div>

                        <div className="mt-3 border p-4 h-[117px] bg-white">
                            <p className="text-sm font-semibold text-gray-600 mb-6">SUMMARY</p>
                            <p className="text-gray-800 leading-relaxed">{item.summary}</p>
                        </div>
                    </div>
                ))}

            </div>
            <AddResearchProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={(data) => {
                    // console.log("Added Research Project:", data);

                }}
            />

        </div>
    );
};

export default ResearchProjectsTab;
