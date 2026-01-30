import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import InfoCard from "../components/patientComponents/InfoCard";
import InfoSection from "../components/patientComponents/InfoSection";
import PatientTabs from "../components/patientComponents/PatientTabs";
// import { historyData } from "../utils/PatientsHistoryConstants";

const PatientDetails: React.FC = () => {

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const { id } = useParams();

  const allPatients = useSelector(
    (state: RootState) => state.patients.allPatients
  );

  const decodedName = decodeURIComponent(id || "").toLowerCase();

  const patient = allPatients.find(
    (p: any) => p.patient.toLowerCase() === decodedName
  );

  if (!patient) {
    return (
      <div className="p-5 text-red-500 font-semibold">Patient not found</div>
    );
  }

  const initials = patient.patient
    .split(" ")
    .map((x: string) => x[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-2 select-none">
      <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 items-stretch">

        <InfoCard
          name={patient.patient}
          age={27}
          gender={patient.condition === "Female" ? "Female" : "Male"}
          phone={patient.phone}
          email={patient.email}
          initials={initials}
          status={patient.status}
          id={patient.id}
        />

        <InfoSection
          type="disease"
          disease={patient.condition}
          status={patient.status}
        />

        <InfoSection
          type="insurance"
          insuranceProvider="ABC Health Insurance"
          policyNumber="UNIHLP230006Vo32223"
          planType="EPO"
          status={patient.status}
        />
      </div>

       <div className="mt-4 min-w-max">
        <PatientTabs />
        </div>
        
    </div>
  );
};

export default PatientDetails;
