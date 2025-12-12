import React, { useEffect, useState } from "react";
import { profileStatesService } from "../../services/profileStatesService";
import { ProfileStateItem } from "../../interfaces/profileStatesInterface";

interface Props {
    onCardClick: (title: string) => void;
    activeCard: string;
}

const ProfileStates = ({ onCardClick, activeCard }: Props) => {
    const [states, setStates] = useState<ProfileStateItem[]>([]);
    
    useEffect(() => {
        profileStatesService.getProfileStates().then((data) => setStates(data));
    }, []);

    return (
        
        <div className="space-y-4 mt-3 ">
            {states.map((item) => (
                <div
                key={item.id}
                onClick={() => onCardClick(item.title)}
                className={` h-[110px] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center curcor-pointer transition-all
                ${activeCard === item.title ? "bg-black text-white" : item.bgColor}`}>
                    <h2 className="text-center text-lg font-bold">{item.title}</h2>
                    {item.icon && (
                        <div className="flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                            <img key={i} src={item.icon} alt="Stars" className="h-4 w-4 "/>
                            ))}
                        </div>
                    )}
                    <p className="text-center text-gray-500 mt-1 text-sm">{item.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileStates;

