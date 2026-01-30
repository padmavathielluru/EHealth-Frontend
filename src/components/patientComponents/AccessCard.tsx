import react from "react";

interface AccessCardProps {
    title: string;
}

const AccessCard: React.FC<AccessCardProps> = ({ title }) => {
    return (
        <div className="relative w-[340px] h-[260px] bg-[#D1FFD9] rounded-[32px] flex flex-col items-center justify-center ">
            <h2 className="text-[23px] font-bold text-gray-800 mb-[24px]">{title}</h2>
            <div className="group relative flex flex-col items-center">
            <div className="w-20 h-20 mb-2 rounded-full bg-[#C4F3CC] flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:route-9">
                <img src="images/u_lock-alt.svg" alt="lock" className="w-9 h-9"/>
            </div>
            <button className="px-10 py-1.5 mb-4 text-[18px] rounded-full border border-blue-500 text-blue-500 font-bold transition-all duration-200 hover:bg-green-100 hover:border-blue-700 hover:text-blue-700">
                    Request Access
            </button>
            </div>
        </div>
    );
};

export default AccessCard;