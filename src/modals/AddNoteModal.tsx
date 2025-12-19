import React, { useRef } from "react";
import Title from "../components/Title";
import EnterSymptoms from "../components/patientComponents/addNotes.tsx/EnterSymptoms";
import AddDiagnosis from "../components/patientComponents/addNotes.tsx/AddDiagnosis";
import AddPrescriptions from "../components/patientComponents/addNotes.tsx/AddPrescriptions";
import ClinicalNotes from "../components/patientComponents/addNotes.tsx/ClinicalNotes";
import { Add } from "@mui/icons-material";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onClose }) => {

  const symptomsRef = useRef<any>(null);

  const handleSave = () => {
    const isSymptomsValid = symptomsRef.current?.validate();

    if (!isSymptomsValid) {
        alert("Please fill all required fields in Symptoms");
        return;
    }

    // Similarly validate other sections
    console.log("All good, SAVE!");
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-[90vw] max-w-[1440px] max-h-[90vh] shadow-lg flex flex-col">
        <div className="flex items-center justify-between px-6 py-4">
          <Title text="Add Note" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center">
            <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1  overflow-y-auto px-6 py-4">
           <div className="h-[1000px] ">
            <EnterSymptoms />
            <AddDiagnosis />
            <AddPrescriptions />
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
