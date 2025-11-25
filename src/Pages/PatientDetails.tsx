import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import InfoCard from "../components/patientComponents/InfoCard";
import InfoSection from "../components/patientComponents/InfoSection";

const PatientDetails: React.FC = () => {
  const { id } = useParams();
 const allPatients = useSelector((state: RootState) => state.patients.allPatients);

  const decodedName = decodeURIComponent(id || "").toLowerCase();

  const patient = allPatients.find(
    (p: any) => p.patient.toLowerCase() === decodedName
  );

  if (!patient)
    return <div className="p-5 text-red-500 font-semibold">Patient not found</div>;

  const initials = patient.patient
    .split(" ")
    .map((x: string) => x[0])
    .join("")
    .toUpperCase();


  return (
    <div className="p-6 mt-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-stretch">
        <div className="col-span-2 h-full ">
          <InfoCard 
          name={patient.patient}
          age={27}
          gender={patient.condition === "Female" ? "Female" : "Male"}
          phone={patient.phone}
          email={patient.email}
          initials={patient.patient.split(" ").map((n: string) => n[0]).join("")}
          status={patient.status}
          id={patient.id}
          />
        </div>

        <div className="col-span-1 h-full">
          <InfoSection
          disease={patient.condition}
          status={patient.status}
          insuranceProvider="ABC Health Insurance"
          policyNumber="UNIHLP230006Vo32223"
          planType="EPO"
          />

        </div>
      </div>
     
    </div>
  );
};

export default PatientDetails;
