import React, { useRef } from "react";
import Title from "../components/Title";
import EnterSymptoms from "../components/patientComponents/addNotes.tsx/EnterSymptoms";
import AddDiagnosis from "../components/patientComponents/addNotes.tsx/AddDiagnosis";
import AddPrescriptions from "../components/patientComponents/addNotes.tsx/AddPrescriptions";
import ClinicalNotes from "../components/patientComponents/addNotes.tsx/ClinicalNotes";
import LabTests from "../components/patientComponents/addNotes.tsx/LabTests";
import AddReferrals from "../components/patientComponents/addNotes.tsx/AddReferrals";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onClose }) => {
  const [formError, setFormError] = React.useState("");

  const symptomsRef = useRef<any>(null);
  const diagnosisRef= useRef<any>(null);
  const prescriptionsRef= useRef<any>(null);

  const handleSave = () => {
    setFormError("");

    const isSymptomsValid = symptomsRef.current?.validate();
    const isDiagnosisValid = diagnosisRef.current?.validate();
    const isPrescriptionValid = prescriptionsRef.current?.validate();

    if (!isSymptomsValid || !isDiagnosisValid || !isPrescriptionValid) {
        setFormError("Please fill all mandatory fields marked with *");
        return;
    }
    console.log("All validations passed, SAVE!");
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-[90vw] max-w-[1440px] max-h-[90vh] shadow-lg flex flex-col">
        <div className="flex flex-col gap-1 px-2 py-1">
        <div className="flex items-center justify-between px-6 py-4">
          <Title text="Add Note" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center">
            <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
          </button>
        </div>
        {formError && (
          <p className="text-sm ml-4 text-red-500 font-medium">
            {formError}
          </p>
        )}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
           <div className="h-[1000px]">
            <EnterSymptoms ref={symptomsRef}/>
            <AddDiagnosis ref={diagnosisRef}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LabTests />
              <AddReferrals />
            </div>
            <AddPrescriptions ref={prescriptionsRef}/>
            <ClinicalNotes />
            </div>
        </div>
 
        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            className="px-6 py-2 border rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-300"
            onClick={onClose}>
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
