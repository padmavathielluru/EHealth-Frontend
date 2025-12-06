import React from "react";
import { Profile } from "../../interfaces/profileInterface";

interface ProfileIdCardProps {
    data: Profile;
}

const ProfileIdCard: React.FC<ProfileIdCardProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl p-3 w-full h-[420px] border">
            <div className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-md mb-6">
                {data.id}
            </div>

            <img 
            src={data.image}
            alt={data.name}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-800 text-center">{data.name}</h2>

            <p className="text-gray-500 text-sm text-center mb-3">{data.specialty}</p>
            <div className="flex justify-center mb-4">
            <span
            className={`px-4 py-1 text-sm font-semibold rounded-md ${
                data.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
            >{data.status}</span>
            </div>
            <p className="text-gray-500 text-sm text-center mb-2">{data.email}</p>

            <p className="text-gray-500 text-sm text-center">{data.phone}</p>

        </div>
    );
};

export default ProfileIdCard;