import React from "react";

interface InfoSectionProps {
  type: "disease" | "insurance";
  disease?: string;
  status?: string;
  insuranceProvider?: string;
  policyNumber?: string;
  planType?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  type,
  disease,
  status,
  insuranceProvider,
  policyNumber,
  planType,
}) => {

    const getStatusColor = (status?: string) => {
        if (!status) return "text-gray-600";

        switch (status.toUpperCase()) {
            case "ACTIVE":
                return "text-green-500";
            case "INACTIVE":
                return "text-gray-500";
            case "NEW":
                return "text-pink-500";
            default:
                return "text-gray-600";
        }
    };

    const formatStatusText =(status?: string) => {
        if (!status) return "";
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

  return (
    <div className="flex flex-col gap-4 h-full">

      {type === "disease" && (
        <div className="bg-orange-100 p-5 rounded-xl flex flex-col items-center justify-center  text-center h-full">
          <h3 className="text-gray-700 font-semibold mb-4">Diseases</h3>

          <div className=" flex items-center justify-center rounded-full bg-orange-200  w-12 h-12">
            <img src="/images/Group 155.svg" alt="icon" className="w-6 h-6" />
            {/* <span className="text-gray-600">{disease}</span> */}
          </div>

          <p className="mt-3 text-gray-600 text-sm">
            Waiting for approval!
          </p>
        </div>
      )}

      {type === "insurance" && (
        <div className="bg-blue-100 p-6 rounded-xl shadow-sm flex flex-col items-center text-center h-full">
          <h3 className="text-gray-700 font-semibold mb-4 ">Insurance</h3>

          <p className="text-sm text-gray-800 font-medium">
            {insuranceProvider}
          </p>

          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            PN: {policyNumber} <br />
            Plan Type: {planType} <br />
            Coverage Status:{" "}
            <span className={`font-semibold ${getStatusColor(status)}`}>
                {formatStatusText(status)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoSection;
