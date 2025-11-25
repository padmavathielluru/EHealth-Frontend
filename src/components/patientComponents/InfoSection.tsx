import React from "react";

interface InfoSectionProps {
    disease: string;
    status: string;
    insuranceProvider: string;
    policyNumber: string;
    planType: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
    disease,
    status,
    insuranceProvider,
    policyNumber,
    planType,
}) => {
     return(
        <div className="flex flex-col gap-4 h-full">
            <div className="bg-orange-50 p-5 rounded-xl shadow-sm w-full flex-1">
                <h3 className="text-gray-700 font-semibold">
                    Diseases
                </h3>
                <div className="mt-3 flex items-center gap-3">
                    <img src="/images/Group 155.svg" alt="group" className="w-6 h-6" />
                    <span className="text-gray-600">
                        {disease}
                    </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                    Waiting for approval!
                </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl shadow-sm w-full flex-1">
                <h3 className="text-gray-700 font-semibold">
                    Insurance
                </h3>
                <p className="text-sm text-gray-800 mt-2 font-medium">
                    {insuranceProvider}
                </p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    PN: {policyNumber} <br />
                    Plan Type: {planType} <br />
                    Coverage Status:{" "}
                    <span className="text-gray-600 font-semibold">{status}</span>
                </p>
            </div>
        </div>
     );
};

export default InfoSection;