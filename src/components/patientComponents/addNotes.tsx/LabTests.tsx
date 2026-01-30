import React, { useState, useRef, useEffect } from "react";

interface LabRow {
  testName: string;
  suggestLab: string;
}

const labOptions = ["Lab A", "Lab B", "Lab C"];
const emptyLab: LabRow = { testName: "", suggestLab: "" };

const LabTests = () => {
  const [SectionOpen, setSectionOpen] = useState(false);
  const [rows, setRows] = useState<LabRow[]>([emptyLab]);
  const [openLab, setOpenLab] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const updateRow = (i: number, key: keyof LabRow, val: string) => {
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
        setOpenLab(null);
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
        className="flex items-center justify-between px-4 py-3 border-b bg-gray-100 rounded-t-xl cursor-pointer">
        <p className="font-medium text-gray-800">Lab Tests</p>
        <img
          src="/images/fi_chevron-down.svg" alt="down"
          className={`w-5 transition-transform ${SectionOpen ? "rotate-180" : ""}`}/>
      </div>

      {SectionOpen && (
        <div className="px-4 pb-4 space-y-4 overflow-y-auto">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-end gap-3">
              <div className="w-full md:w-[260px]">
                <label className="text-xs text-gray-500">
                  Test Name
                  {/* <span className="text-red-400">*</span> */}
                </label>
                <input
                  value={row.testName}
                  onChange={(e) =>
                    updateRow(i, "testName", e.target.value)
                  }
                  onFocus={() => setOpenLab(null)}
                  placeholder="Enter test"
                  className="mt-1 w-full h-9 px-3 border rounded-lg text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>

              {i === 0 && (
              <div className="w-full md:w-[160px] relative">
                <label className="text-xs text-gray-500">
                  Suggest Lab
                  {/* <span className="text-red-400">*</span> */}
                </label>
                <div
                  onClick={() => setOpenLab(openLab === i ? null : i)}
                  className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer
                            focus:ring-1 focus:ring-blue-500">
                  <span
                    className={
                      row.suggestLab ? "text-gray-900" : "text-gray-400"
                    }>
                    {row.suggestLab || "Select"}
                  </span>
                  <img
                    src="/images/fi_chevron-down.svg" alt="down"
                    className={`w-4 transition-transform ${openLab === i ? "rotate-180" : ""}`}/>
                </div>

                {openLab === i && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-md">
                    {labOptions.map((l) => (
                      <div
                        key={l}
                        onClick={() => {
                          updateRow(i, "suggestLab", l);
                          setOpenLab(null);
                        }}
                        className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer" >
                        {l}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              )}
              <div className="flex gap-2 w-full md:w-[96px]">
                {i === 0 ? (
                  <button
                    onClick={() => setRows([...rows, emptyLab])}
                    className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                    <img src="/images/u_plus(1).svg" alt="plus" className="w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setRows(rows.filter((_, x) => x !== i))
                    }
                    className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100">
                    <img src="/images/u_trash.svg" alt="delete" className="w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabTests;
