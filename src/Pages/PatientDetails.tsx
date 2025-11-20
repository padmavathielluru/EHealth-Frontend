import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PatientDetails = () => {
  const { id } = useParams();
  const { filtered } = useSelector((state: RootState) => state.patients);

  // Find patient by id
  const patient = filtered.find((p: any) => p.id === id);

  if (!patient) return <div className="p-5">Patient not found</div>;

  return (
    <div className="p-6">

      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {patient.patient}
      </h2>

      <div className="flex items-center text-sm text-gray-600 mb-6">
        <span className="flex items-center gap-2">
          <img src="/images/home-icon.svg" className="w-4" />
          Home
        </span>

        <span className="mx-2">{">"}</span>

        <span className="flex items-center gap-2">
          <img src="/images/user-group.svg" className="w-4" />
          Patients
        </span>

        <span className="mx-2">{">"}</span>
        <span className="text-blue-600">{patient.patient}</span>
      </div>

      {/* ------ TOP CARDS LAYOUT ------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* LEFT — Patient Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-200 text-purple-700 text-2xl font-bold">
            {patient.patient[0]}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{patient.patient}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ACTIVE
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              27y • Female
            </p>

            <p className="text-gray-700 text-sm">{patient.phone}</p>
            <p className="text-blue-600 underline text-sm">{patient.email}</p>
          </div>
        </div>

        {/* MIDDLE — Diseases Box */}
        <div className="bg-[#FFF5E5] p-6 rounded-xl shadow-sm border border-gray-300 flex flex-col items-center justify-center">
          <img src="/images/Group 155.svg" className="w-10 mb-3" />
          <p className="text-gray-700 font-medium">Waiting for approval!</p>
        </div>

        {/* RIGHT — Insurance Box */}
        <div className="bg-[#E8F0FE] p-6 rounded-xl shadow-sm border border-gray-300">
          <h3 className="font-semibold text-gray-800">Insurance</h3>

          <p className="mt-3 font-medium">ABC Health Insurance</p>

          <p className="text-sm text-gray-600">
            PN: UNHLP23908V032223 <br />
            Plan Type: EPO <br />
            Coverage Status: <span className="text-green-600">Active</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;
