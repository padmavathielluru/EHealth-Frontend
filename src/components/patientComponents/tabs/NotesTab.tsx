import React, { useState } from "react";
import { HistoryItem } from "../../../interfaces/historyInterface";
import { historyData } from "../../../utils/PatientsHistoryConstants";
import Searchbar from "../../Searchbar";
import Pagination from "../../Pagination";

const NotesTab = () => {
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem>(
    historyData[0]
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const appointment = selectedHistory.appointments[0];

  const maxRows = Math.max(
    appointment.symptoms.length,
    appointment.diagnosis.length,
    appointment.prescriptions.length,
    appointment.referrals.length
  );

  const avatarColors = [
    "bg-yellow-200 ",
    "bg-blue-200 ",
    "bg-green-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
  ];

  const getInitials = (name: string) => {
    if (!name) return "DR";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const getColorIndex = (name: string) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return sum % avatarColors.length;
  };

  const itemsPerPage = 10;

  const filteredData = historyData.filter((item) =>
    item.date.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="">
      <div className="border rounded-xl bg-white shadow-sm p-4 space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Consultation Notes</h2>
          <div className="flex justify-center">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-400 transition"
              onClick={() => console.log("Edit clicked")}
            >
              <img
                src="/images/u_plus-2.svg"
                alt="Plus"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">

          <div className="grid grid-cols-[280px_1fr_50px] items-center bg-white border-b">

            <div className="px-4 py-4 border-r">
              <h3 className="text-base text-gray-600 font-semibold">
                HISTORY
              </h3>
            </div>

            <div className="px-4 py-3">
              <h3 className="text-base font-semibold text-gray-800">
                {selectedHistory.date}
              </h3>
            </div>
            <div className="flex justify-center">
              <button
                className="w-10 h-10 flex items-center justify-center border rounded-md hover:bg-gray-100 transition"
                onClick={() => console.log("Edit clicked")}
              >
                <img
                  src="/images/fi_edit-2.svg"
                  alt="edit"
                  className="w-4 h-4"
                />
              </button>
            </div>

          </div>

          <div className="grid grid-cols-[280px_1fr]">

            <div className="flex flex-col  overflow-hidden h-full">

              <div className="border-r px-3 py-2">
                <Searchbar
                  value={search}
                  onChange={(value: string) => setSearch(value)}
                />
              </div>

              <div className="flex-1 border-r overflow-y-auto divide-y border-t bg-gray-50">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedHistory(item)}
                      className={`cursor-pointer px-3 py-2 transition ${selectedHistory.id === item.id
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {item.date}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-400 text-sm text-center">
                    No history found
                  </div>
                )}
              </div>


              <div className="border-t px-3  border-r">
                <Pagination
                  currentPage={currentPage}
                  totalPages={8}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="max-h-[500px] overflow-y-auto scroll-smooth ">
                <div className="border rounded-lg overflow-hidden ">
                  <div className="grid grid-cols-4 h-16 text-gray-700 font-semibold text-sm border-b text-center">
                    <div className="flex items-center justify-center px-4 py-2 border-r">SYMPTOM</div>
                    <div className="flex items-center justify-center px-4 py-2 border-r">DIAGNOSIS</div>
                    <div className="flex items-center justify-center px-4 py-2 border-r">MEDICATION</div>
                    <div className="flex items-center justify-center px-4 py-2">REFERRALS </div>
                  </div>


                  {Array.from({ length: maxRows }).map((_, idx) => {
                    const sym = appointment.symptoms[idx];
                    const diag = appointment.diagnosis[idx];
                    const med = appointment.prescriptions[idx];
                    const ref = appointment.referrals[idx];

                    const severity = sym.severity?.toUpperCase() || "";

                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-4 text-sm text-gray-800 border-b last:border-none"
                      >

                        <div className="px-4 py-3 border-r">
                          {sym ? (
                            <div>
                              <p className="font-semibold text-base text-gray-800">{sym.symptomName}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full mt-1 inline-block 
                                ${severity === "SEVERE"
                                    ? "bg-red-100 text-red-600"
                                    : sym.severity === "MODERATE"
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-yellow-100 text-yellow-600"
                                  }`}
                              >
                                {severity}
                              </span>
                              {sym.description && (
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                  {sym.description}</p>
                              )}
                            </div>
                          ) : (
                            "—"
                          )}
                        </div>


                        <div className="px-4 py-3 border-r">
                          {diag ? (
                            <>
                              <p className="font-semibold text-base">{diag.diagnosisName}</p>
                              {diag.description && (
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                  {diag.description}</p>
                              )}
                            </>
                          ) : (
                            "—"
                          )}
                        </div>


                        <div className="px-4 py-3 border-r">
                          {med ? (
                            <>
                              <p className="font-semibold text-base">{med.medicineName}</p>
                              <div className="flex flex-wrap items-center gap-2 text-gray-600 text-xs mt-2">
                                <span>{med.dosage}</span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                <span>{med.frequency}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-gray-600 text-xs mt-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                {med.note && <span>{med.note}</span>}

                                {med.note && med.startDate && (
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                )}
                                {med.startDate && <span>{med.startDate}</span>}
                              </div>
                              {med.description || med.instructions ? (
                                <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                                  {med.description || med.instructions}
                                </p>
                              ) : null}
                            </>
                          ) : (
                            "—"
                          )}
                        </div>


                        <div className="px-4 py-4">
                          {ref ? (
                            <>
                              <p className="font-semibold text-base">{ref.referralType || "Doctor"}</p>
                              <div className="flex items-center gap-3 mt-3">

                                <div className={`w-10 h-10 rounded-full  flex items-center justify-center text-gray-700 text-base font-semibold ${avatarColors[getColorIndex(ref.referralName || "DR")]}`}
                                >
                                  {getInitials(ref.referralName)}
                                </div>

                                <div>
                                  <p className="font-semibold text-gray-800 text-sm">
                                    {ref.referralName}
                                  </p>
                                  <p className="text-gray-500 text-xs">{ref.category}</p>
                                </div>
                              </div>
                              {ref.date && (
                                <div className="mt-4 border rounded-lg p-3 text-xs bg-white">
                                  <p className="text-gray-500 font-medium">REF. DATE</p>
                                  <p className="text-gray-800">{ref.date}</p>
                                </div>
                              )}


                              {ref.status && (
                                <div className="mt-3 border rounded-lg p-3 text-xs bg-white">
                                  <p className="text-gray-500 font-medium">STATUS</p>
                                  <p className="text-gray-800">{ref.status}</p>
                                </div>
                              )}
                            </>
                          ) : (
                            "—"
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesTab;


