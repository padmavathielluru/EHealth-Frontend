import React, { useState, useRef } from "react";

interface DiagnosisRow {
  diagnosis: string;
  status: string;
  conclusion: string;
}

interface LabRow {
  testName: string;
  suggestLab: string;
}

interface ReferralRow {
  referralName: string;
  note: string;
}

const statusOptions = ["Pending", "Confirmed", "Resolved"];
const labOptions = ["Lab A", "Lab B", "Lab C"];
const referralOptions = ["Specialist A", "Specialist B"];

const emptyDiagnosis: DiagnosisRow = { diagnosis: "", status: "", conclusion: "" };
const emptyLab: LabRow = { testName: "", suggestLab: "" };
const emptyReferral: ReferralRow = { referralName: "", note: "" };

const AddDiagnosis = () => {
  const [sectionOpen, setSectionOpen] = useState(true);

  const [diagnosisRows, setDiagnosisRows] = useState([emptyDiagnosis]);
  const [labRows, setLabRows] = useState([emptyLab]);
  const [referralRows, setReferralRows] = useState([emptyReferral]);

  const [showLabs, setShowLabs] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  const [openStatus, setOpenStatus] = useState<number | null>(null);
  const [openLab, setOpenLab] = useState<number | null>(null);
  const [openReferral, setOpenReferral] = useState<number | null>(null);

  const statusRef = useRef<HTMLDivElement | null>(null);
  const labRef = useRef<HTMLDivElement | null>(null);
  const referralRef = useRef<HTMLDivElement | null>(null);

  const updateDiagnosis = (i: number, key: keyof DiagnosisRow, val: string) => {
    const data = [...diagnosisRows];
    data[i][key] = val;
    setDiagnosisRows(data);
  };

  const updateLab = (i: number, key: keyof LabRow, val: string) => {
    const data = [...labRows];
    data[i][key] = val;
    setLabRows(data);
  };

  const updateReferral = (i: number, key: keyof ReferralRow, val: string) => {
    const data = [...referralRows];
    data[i][key] = val;
    setReferralRows(data);
  };

  return (
    <div className="border rounded-xl bg-white mt-4 ">
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-t-xl border-b cursor-pointer"
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        <span className="font-medium text-gray-800">Add Diagnosis</span>
        <img
          src="/images/fi_chevron-down.svg" alt="down"
          className={`w-5 h-5 transition-transform ${sectionOpen ? "rotate-180" : ""}`}
        />
      </div>

      {sectionOpen && (
        <div className="px-4 pb-4 overflow-y-auto ">
          <div className="max-h-[60vh] md:max-h-[260px] space-y-3 pr-1 ">
            {diagnosisRows.map((row, i) => (
              <div key={i} className={`flex items-end gap-3 pt-3 flex-col md:flex-row md:item-end ${i === diagnosisRows.length - 1 ? "border-b border-gray-200 mx-2 pb-4" : ""}`}>
                <div className="w-full md:w-[280px]">
                  <label className="text-xs text-gray-500">Diagnosis<span className="text-red-400">*</span></label>
                  <input
                    value={row.diagnosis}
                    onChange={(e) => updateDiagnosis(i, "diagnosis", e.target.value)}
                    placeholder="Select"
                    className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:w-[220px] w-full relative">
                  <label className="text-xs text-gray-500">Status<span className="text-red-400">*</span></label>
                  <div
                    ref={statusRef}
                    onClick={() => setOpenStatus(openStatus === i ? null : i)}
                    className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <span className={row.status ? "text-gray-900" : "text-gray-400"}>
                      {row.status || "Select"}
                    </span>
                    <img src="/images/fi_chevron-down.svg" alt="down" className={`w-4 ${openStatus === i && "rotate-180"}`} />
                  </div>

                  {openStatus === i && (
                    <div
                      className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-md">
                      {statusOptions.map((s) => (
                        <div
                          key={s}
                          onClick={() => {
                            updateDiagnosis(i, "status", s);
                            setOpenStatus(null);
                          }}
                          className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer">
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full md:flex-1">
                  <label className="text-xs text-gray-500">Conclusion<span className="text-red-400">*</span></label>
                  <input
                    value={row.conclusion}
                    onChange={(e) => updateDiagnosis(i, "conclusion", e.target.value)}
                    placeholder="Conclusion"
                    className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-2 w-full justify-end md:w-[96px]">
                  {i === 0 && (
                    <button
                      onClick={() => setDiagnosisRows([...diagnosisRows, emptyDiagnosis])}
                      className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100"
                    >
                      <img src="/images/u_plus(1).svg" alt="plus" className="w-4" />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      diagnosisRows.length > 1 &&
                      setDiagnosisRows(diagnosisRows.filter((_, x) => x !== i))
                    }
                    className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <img src="/images/u_trash.svg" alt="delete" className="w-4" />
                  </button>
                </div>

              </div>
            ))}

            <div className="flex flex-col md:flex-row md:items-end mt-3 gap-3 px-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLabs}
                  onChange={() => setShowLabs(!showLabs)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                Lab Tests
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showReferrals}
                  onChange={() => setShowReferrals(!showReferrals)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                Add Referrals
              </label>
            </div>

            {showLabs && (
              <div className="mt-4 ">
                <p className="text-lg font-semibold text-gray-700 mb-3 px-2">Lab Tests</p>
                {labRows.map((row, i) => (
                  <div key={i} className="flex items-end gap-3 mt-3 px-2">
                    <div className="w-full md:w-64">
                      <label className="text-xs text-gray-500">Test Name</label>
                      <input
                        value={row.testName}
                        onChange={(e) => updateLab(i, "testName", e.target.value)}
                        placeholder="Enter test"
                        className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="w-full md:w-40 relative">
                      <label className="text-xs text-gray-500">Suggest Lab</label>
                      <div
                        ref={labRef}
                        onClick={() => setOpenLab(openLab === i ? null : i)}
                        className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <span className={row.suggestLab ? "text-gray-900" : "text-gray-400"}>
                          {row.suggestLab || "Select"}
                        </span>
                        <img src="/images/fi_chevron-down.svg" alt="down" className="w-4" />
                      </div>

                      {openLab === i && (
                        <div
                          className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-md">
                          {labOptions.map((l) => (
                            <div
                              key={l}
                              onClick={() => {
                                updateLab(i, "suggestLab", l);
                                setOpenLab(null);
                              }}
                              className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                              {l}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                    {i === 0 && (
                      <button
                        onClick={() => setLabRows([...labRows, { ...emptyLab }])}
                        className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100"
                      >
                        <img src="/images/u_plus(1).svg" alt="plus" className="w-4" />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        labRows.length > 1 &&
                        setLabRows(labRows.filter((_, x) => x !== i))
                      }
                      className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      <img src="/images/u_trash.svg" alt="delete" className="w-4" />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            )}


            {showReferrals && (
              <div className="mt-4 ">
                <p className="text-lg font-semibold text-gray-700 mb-3 px-2">Add Referrals</p>
                {referralRows.map((row, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-end gap-3 mt-3 px-2">
                    <div className="w-full md:w-60 relative">
                      <label className="text-xs text-gray-500">Referral Name</label>
                      <div ref={referralRef}
                        onClick={() => setOpenReferral(openReferral === i ? null : i)}
                        className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <span className={row.referralName ? "text-gray-900" : "text-gray-400"}>
                          {row.referralName || "Select"}
                        </span>
                        <img
                          src="/images/fi_chevron-down.svg" alt="down"
                          className={`w-4 transition-transform ${openReferral === i ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                      {openReferral === i && (
                        <div
                          className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-md">
                          {referralOptions.map((r) => (
                            <div
                              key={r}
                              onClick={() => {
                                updateReferral(i, "referralName", r);
                                setOpenReferral(null);
                              }}
                              className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-64">
                      <label className="text-xs text-gray-500">Note</label>
                      <input
                        value={row.note}
                        onChange={(e) => updateReferral(i, "note", e.target.value)}
                        placeholder="Enter note"
                        className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 justify-end w-full md:w-auto">
                      {i === 0 && (
                        <button
                          onClick={() =>
                            setReferralRows([...referralRows, { ...emptyReferral }])
                          }
                          className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                          <img src="/images/u_plus(1).svg" alt="plus" className="w-4" />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          referralRows.length > 1 &&
                          setReferralRows(referralRows.filter((_, x) => x !== i))
                        }
                        className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100">
                        <img src="/images/u_trash.svg" alt="delete " className="w-4" />
                      </button>
                    </div>
                  </div>

                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDiagnosis;
