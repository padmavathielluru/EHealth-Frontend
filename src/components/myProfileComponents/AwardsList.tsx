import react, { useEffect, useState } from "react";
import { awardsListService } from "../../services/awardsListService";
import { AwardItem } from "../../interfaces/awardsListInterface";
import Title from "../Title";
import AddNewAwardModal from "../../modals/AddNewAwardModal";

const AwardsList = () => {
    const [awards, setAwards] = useState<AwardItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        awardsListService.getAwards().then((data: AwardItem[]) => setAwards(data));
    }, []);

    return (
        <div className="">
            <div className="flex items-center gap-4 mb-2 ">
                <Title text="Awards" />

                <button onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition">
                    <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-3 pr-2 pt-2 pl-2 bg-blue-50 h-[111vh] rounded-xl">
                {awards.map((award, index) => (
                
                    <div
                        key={award.id}
                        className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-start relative"
                    >
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                            <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                <img src="/images/fi_edit-2.svg" alt="edit" className="w-4 h-4" />
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                                <img src="/images/u_trash.svg" alt="delete" className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-3 w-[60px] h-[60px] rounded-full bg-blue-50 flex pt-1.5 items-center justify-center">
                            <img src="/images/Group.svg" alt="award" className="w-7 h-7" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{award.title}</h3>

                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                <span>{award.year}</span>
                                <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                                <span className="uppercase tracking-wide">{award.organization}</span>
                            </div>

                            <p className="text-gray-600 text-sm mt-6">
                                {award.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

            <AddNewAwardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AwardsList;

