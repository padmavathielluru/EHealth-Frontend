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
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-5 w-full h-full">

            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-purple-200 text-xl font-semibold">
                {initials}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {status}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {id}
                    </span>
                </div>

                <p className="text-gray-600 mt-2 text-sm">
                    {age}y . {gender} . {phone} . {email}
                </p>               
            </div>

        </div>
    );
};

export default InfoCard;