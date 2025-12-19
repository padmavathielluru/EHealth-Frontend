import React, { useState } from "react";

const ClinicalNotes = () => {
  const [sectionOpen, setSectionOpen] = useState(true);

  return (
    <div className="border rounded-xl bg-white mt-4">

      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b rounded-t-xl cursor-pointer"
        onClick={() => setSectionOpen(!sectionOpen)}>
        <p className="font-medium text-gray-800">Clinical Notes</p>
        <img
          src="/images/fi_chevron-down.svg" alt="down"
          className={`w-5 h-5 transition-transform duration-300 ${sectionOpen ? "rotate-180" : ""}`} />
      </div>
      {sectionOpen && (
        <div className="overflow-y-auto">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Subjective
              </label>
              <textarea
                rows={3}
                placeholder="Patient complains of fever and dry cough"
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Objective
              </label>
              <textarea
                rows={3}
                placeholder="Select"
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Assessment
              </label>
              <textarea
                rows={3}
                placeholder="Viral URTI suspected"
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Plan
              </label>
              <textarea
                rows={3}
                placeholder="Paracetamol; CBC; Follow-up in 3 days"
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalNotes;
