import React from "react";

interface InfoCardProps {
    name: string;
    age: number;
    gender: string;
    phone: string;
    email:string;
    initials: string;
    status: string;
    id: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
    name,
    age,
    gender,
    phone,
    email,
    initials,
    status,
    id
}) => {

    const getAvatarColors = (letter: string) => {
        const l = letter.toUpperCase();

        if (l < "G") return "bg-purple-200 text-purple-500";
        if (l < "M") return "bg-blue-200 text-blue-500";
        if (l < "S") return "bg-green-200 text-green-500";
        return "bg-pink-200 text-pink-500";
    }
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-5 
        w-full max-w-[360px] md:max-w-full mx-auto md:mx-0">

            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl font-semibold 
            ${getAvatarColors(initials[0] || "A")}`}>
                {initials || "?"}
            </div>

            <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    {name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                        {status}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                        {id}
                    </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-4">
                    <span>{age}y</span>

                    <span className="mx-2 inline-block w-2 h-2 rounded-full bg-gray-400">
                    </span>
                    <span>{gender}</span>
                </div> 

                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span>{phone}</span>

                    <span className="mx-2 inline-block w-2 h-2 rounded-full bg-gray-400"></span>

                    <span>{email}</span>
                </div>           
            </div>

        </div>
    );
};

export default InfoCard;