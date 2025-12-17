import React, { useState, useEffect, useMemo } from "react";
import { HistoryItem } from "../../../interfaces/consultationNotesTabInterface";
import { getConsultationNotesHistory, } from "../../../services/consultationNotesTabService";
import { SEVERITY_CONFIG,DIAGNOSIS_STATUS_CONFIG,PRESCRIPTION_TABLE_HEADERS } from "../../../utils/ConsultationNotesTabConstants";
import Searchbar from "../../Searchbar";
import Pagination from "../../Pagination";
import Title from "../../../components/Title";
import AddNoteModal from "../../../modals/AddNoteModal";

const ConsultationNotesTab = () => {
  const historyList = useMemo(() => getConsultationNotesHistory(), []);

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  const [selectedHistory, setSelectedHistory] = useState<HistoryItem>(
    historyList[0]
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const appointment = selectedHistory.appointments[0];
  const consultationId = selectedHistory.cid;

  const avatarColors = [
    "bg-yellow-200 ",
    "bg-blue-200 ",
    "bg-green-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
  ];

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return historyList.filter((item: HistoryItem) =>
      item.date.toLowerCase().includes(search.toLowerCase())
    );
  }, [historyList, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (paginatedData.length > 0) {
      setSelectedHistory(paginatedData[0]);
    }
  }, [currentPage, paginatedData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const soapData = [
    { label: "SUBJECTIVE", value: appointment.subjective },
    { label: "OBJECTIVE", value: appointment.objective },
    { label: "ASSESSMENT", value: appointment.assessment },
    { label: "PLAN", value: appointment.plan },
  ]

  return (
    <div className="">
      <div className="border rounded-xl bg-white shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Title text="Consultation Notes" />
          <div className="flex justify-center">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-400 transition"
              onClick={() => setIsAddNoteOpen(true)}>
              <img
                src="/images/u_plus-2.svg"
                alt="Plus"
                className="w-4 h-4"/>
            </button>
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[280px_1fr] items-center bg-white border-b">
            <div className="px-4 py-4 border-r">
              <h3 className="text-base text-gray-600 font-semibold">
                HISTORY
              </h3>
            </div>
            <div className="px-4 py-3 flex items-center gap-3 bg-gray-50 h-full">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-lg">
                {consultationId}
              </span>
              <h3 className="text-base font-semibold text-gray-800">
                {selectedHistory.date}
              </h3>
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
                {filteredData.length === 0 ? (
                  <div className="px-3 py-2 text-gray-400 text-sm text-center">
                    No history found
                  </div>
                ) : (
                  paginatedData.map((item: HistoryItem, index: number) => (
                    <div
                      key={`${currentPage}-${index}`}
                      onClick={() => setSelectedHistory(item)}
                      className={`cursor-pointer px-3 py-2 transition ${selectedHistory.cid === item.cid
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}>
                      {item.date}</div>
                  ))
                )}
              </div>
              <div className="border-t px-3  border-r">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>

            <div className="relative h-[550px] overflow-hidden pb-6">
              <div className="absolute inset-0 overflow-y-auto pr-3 scroll-smooth space-y-4">
                <div className="space-y-4 ml-2 p-4">
                  {soapData.map((item => (
                    <div key={item.label}>
                      <p className="text-sm font-semibold text-gray-400 tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm text-gray-700">{item.value || "---"}</p>
                    </div>
                  )))}
                </div>
                <div className="border rounded-lg p-4 bg-white shadow-sm ml-3">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">SYMPTOMS</h3>
                  <div className="space-y-4">
                    {appointment.symptoms.map((sym, idx) => {
                      const severity = (sym.severity || "MILD") as keyof typeof SEVERITY_CONFIG;
                      const config = SEVERITY_CONFIG[severity];

                      return (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-32 font-medium text-gray-700">{sym.symptomName}</div>
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold ${config.badge}`} >
                            <span className={`w-2 h-2 rounded-full ${config.dot}`}/>
                            {severity}
                          </div>
                          <p className="text-sm text-gray-500">{sym.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                  <div className="border rounded-xl p-4 bg-white shadow-sm space-y-6 ml-3">
                      <h3 className="font-semibold text-lg text-gray-800">DIAGNOSIS</h3>
                      {appointment.diagnosis.map((diag, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex items-center gap-4">
                              <p className="font-medium text-gray-800">{diag.name}</p>
                              {diag.status && (
                                <span className={`text-xs px-3 py-1 rounded font-semibold ${DIAGNOSIS_STATUS_CONFIG[diag.status]}`}>{diag.status}</span>
                              )}
                              <p className="text-sm text-gray-500">{diag.description}</p>
                          </div>

                          {diag.labTests && (
                            <div className="border rounded-lg p-4">
                              <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">LAB TESTS</p>
                              <div className="space-y-3">
                                {diag.labTests.map((lab, i) => (
                                  <div key={i} className="flex gap-10 text-sm">
                                      <span className="w-20 font-medium text-gray-700">{lab.testName}</span>
                                      <span className="text-gray-400">suggested Lab: <b>{lab.suggestedLab}</b></span>
                                  </div>
                                ))}
                              </div>
                              </div>
                          )}
                            {diag.referrals && (
                              <div className="border rounded-lg p-4 ">
                                  <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">REFERRALS</p>
                                  {diag.referrals.map((ref, i) => (
                                    <div key={i} className="space-y-2 ">
                                      <div className="flex items-cenetr gap-3 flex-wrap">
                                          <span className="font-medium text-gray-800">{ref.doctorName}</span>
                                          <span className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-600 font-semibold">{ref.specialization}</span>
                                      </div>
                                      <p className="text-sm text-gray-500" >{ref.notes}</p>
                                    </div>
                                  ))}
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                  <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4 ml-3 ">
                    <h3 className="font-semibold text-lg text-gray-800">PRESCRIPTION</h3>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm ">
                          <thead className=" text-gray-500">
                            <tr>
                              {PRESCRIPTION_TABLE_HEADERS.map((head) => (
                              <th key={head} className="px-4 py-3 text-left font-semibold border border-gray-200">{head.toUpperCase()}</th>
                              ))}
                              </tr>
                          </thead>

                          <tbody>
                            {appointment.prescriptions?.map((med, idx) => (
                              <tr key={idx} className="">
                                <td className="px-4 py-3 border border-gray-200">{med.medicationName}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.dosage}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.frequency}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.time}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.route}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.startDate}</td>
                                <td className="px-4 py-3 border border-gray-200">{med.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                      </table>
                    </div>

                    {appointment.prescriptionReferral && (
                      <div className="border rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-400 tracking-widest mb-2">REFERRALS</p>
                        <p className="text-sm text-gray-500 overflow-hidden" >{appointment.prescriptionReferral.description}</p>
                        </div>
                    )}
                    {appointment.suggestedPharmacy && (
                      <div className="border rounded-lg p-4 text-sm text-gray-600">
                        Suggested Pharmacy:{" "}
                        <span className="font-semibold text-gray-600">
                          {appointment.suggestedPharmacy.name},{" "}
                          {appointment.suggestedPharmacy.location}
                        </span>
                        </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNoteModal open={isAddNoteOpen}
      onClose={() => setIsAddNoteOpen(false)}/>
    </div>
  );
};

export default ConsultationNotesTab;



