import React, { useEffect, useState } from "react";
import Title from "../Title";
import { PublicationsItem } from "../../interfaces/publicationsListInterface";
import { publicationsListService } from "../../services/PublicationsListService";
import AddNewPublicationModal from "../../modals/AddNewPublicationModal";

const PublicationsList = () => {
    const [publications, setPublications] = useState<PublicationsItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        publicationsListService.getPublications().then((data) => {
            setPublications(data);
        });
    }, []);

    return (
        <div>

            <div className="flex items-center gap-4 mb-2">
                <Title text="Publications" />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition">
                    <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4 pr-2 pt-3 pl-2 bg-blue-50 h-[111vh] rounded-xl overflow-y-auto">

                {publications.map((pub) => (
                    <div
                        key={pub.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 relative">
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
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

                        <div className="flex items-start gap-3">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                <img
                                    src="/images/Group(1).svg"
                                    alt="book"
                                    className="w-6 h-6"
                                />
                            </div>

                            <div className="flex-1">
                                <p className="text-lg font-semibold max-w-[500px]">
                                    {pub.title}
                                </p>
                                <p className="text-sm text-gray-500">{pub.year}</p>
                            </div>
                        </div>

                        <div className="mt-4 border px-4 h-[44px] flex items-center bg-white gap-6">
                            <p className="text-sm font-semibold text-gray-600 w-32">JOURNAL</p>
                            <p className="text-gray-800">{pub.journal}</p>
                        </div>

                        <div className="mt-3 border px-4 h-[44px] flex items-center bg-white gap-6">
                            <p className="text-sm font-semibold text-gray-600 w-32">CO-AUTHORS</p>
                            <p className="text-gray-800">{pub.coAuthors}</p>
                        </div>

                        <div className="mt-3 border p-4 h-[117px] bg-white">
                            <p className="text-sm font-semibold text-gray-600 mb-6">SUMMARY</p>
                            <p className="text-gray-800 leading-relaxed">{pub.summary}</p>
                        </div>
                    </div>

                ))}

            </div>
            <AddNewPublicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default PublicationsList;
