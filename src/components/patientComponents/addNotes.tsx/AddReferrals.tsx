import React, { useState, useRef, useEffect } from "react";

interface ReferralRow {
  referralName: string;
  note: string;
}

const referralOptions = ["Specialist A", "Specialist B"];
const emptyReferral: ReferralRow = { referralName: "", note: "" };

const AddReferrals = () => {
  const [SectionOpen, setSectionOpen] = useState(false);
  const [rows, setRows] = useState<ReferralRow[]>([emptyReferral]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const updateRow = (i: number, key: keyof ReferralRow, val: string) => {
    const data = [...rows];
    data[i][key] = val;
    setRows(data);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="border rounded-xl bg-white">
      <div
        onClick={() => setSectionOpen(!SectionOpen)}
        className="flex justify-between items-center px-4 py-3 border-b bg-gray-100 rounded-t-xl cursor-pointer"
      >
        <p className="font-medium text-gray-800">Add Doctor Referrals</p>
        <img
          src="/images/fi_chevron-down.svg" alt="down"
          className={`w-5 transition-transform ${SectionOpen ? "rotate-180" : ""}`}
        />
      </div>

      {SectionOpen && (
        <div className="px-4 pb-4 overflow-y-auto">
           <div className="max-h-[60vh] md:max-h-[260px] space-y-3 pr-1 ">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-end gap-3">
              <div className="w-full md:w-[240px] relative">
                <label className="text-xs text-gray-500">
                  Doctor Referral Name
                  {/* <span className="text-red-400">*</span> */}
                </label>
                <div
                  onClick={() =>
                    setOpenDropdown(openDropdown === i ? null : i)
                  }
                  className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer
                  focus:ring-1 focus:ring-blue-500">
                  <span
                    className={
                      row.referralName
                        ? "text-gray-900"
                        : "text-gray-400"
                    }>
                    {row.referralName || "Select"}
                  </span>
                  <img
                    src="/images/fi_chevron-down.svg" alt="down"
                    className={`w-4 transition-transform ${openDropdown === i ? "rotate-180" : ""}`}/>
                </div>

                {openDropdown === i && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-md">
                    {referralOptions.map((r) => (
                      <div
                        key={r}
                        onClick={() => {
                          updateRow(i, "referralName", r);
                          setOpenDropdown(null);
                        }}
                        className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer">
                        {r}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full md:w-[260px]">
                <label className="text-xs text-gray-500">Note</label>
                <input
                  value={row.note}
                  onFocus={() => setOpenDropdown(null)}
                  onChange={(e) => updateRow(i, "note", e.target.value)}
                  placeholder="Enter note"
                  className="mt-1 w-full h-9 px-3 border rounded-lg text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>
              <div className="flex gap-2 w-full md:w-[96px]">
                {i === 0 ? (
                  <button
                    onClick={() =>
                      setRows([...rows, emptyReferral])
                    }
                    className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                    <img
                      src="/images/u_plus(1).svg"
                      alt="plus"
                      className="w-4"/>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      rows.length > 1 &&
                      setRows(rows.filter((_, x) => x !== i))
                    }
                    className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100">
                    <img
                      src="/images/u_trash.svg"
                      alt="delete"
                      className="w-4"/>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default AddReferrals;
