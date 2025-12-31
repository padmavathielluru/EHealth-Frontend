import React, { useState, useRef, useImperativeHandle } from "react";
import DateYearCalendar from "../../commonComponents/DateYearCalendar";
import { dateDDMMYYYYSchema } from "../../commonComponents/schema";

interface PrescriptionRow {
  diagnosis: string;
  medication: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  duration: string;
  dosageTime: string;
  remarks: string;
}

const diagnosisOptions = ["Fever", "Cold", "Diabetes"];
const dosageTimeOptions = ["BF", "AF", "Night"];

const emptyRow: PrescriptionRow = {
  diagnosis: "",
  medication: "",
  dosage: "",
  frequency: "",
  route: "",
  startDate: "",
  duration: "",
  dosageTime: "",
  remarks: "",
};

const AddPrescriptions = React.forwardRef<any>((_, ref) => {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [rows, setRows] = useState<PrescriptionRow[]>([{ ...emptyRow }]);

  const [openDiagnosis, setOpenDiagnosis] = useState<number | null>(null);
  const [openRoute, setOpenRoute] = useState<number | null>(null);
  const [openDosageTime, setOpenDosageTime] = useState<number | null>(null);

  const diagnosisRef = useRef<HTMLDivElement | null>(null);
  const routeRef = useRef<HTMLDivElement | null>(null);
  const dosageTimeRef = useRef<HTMLDivElement | null>(null);

  const [pharmacies, setPharmacies] = useState<string[]>([""]);
  const [openPharmacy, setOpenPharmacy] = useState<number | null>(null);
  const pharmacyRef = useRef<HTMLDivElement | null>(null);

  const [errors, setErrors] = useState<Record<number, string>>({});

  const routeOptions = ["Oral", "Injection", "IV"];
  const pharmacyOptions = ["Apollo Pharmacy", "MedPlus", "Local Pharmacy"];

  const handleChange = (
    index: number,
    field: keyof PrescriptionRow,
    value: string
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { ...emptyRow }]);
  };

  const deleteRow = (index: number) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const validateStartDate = (index: number, rawValue: string, formattedValue: string) => {
    if (/[^0-9/]/.test(rawValue)) {
      setErrors((prev) => ({
        ...prev,
        [index]: "*Only numbers allowed",
      }));
      return;
    }

    const result = dateDDMMYYYYSchema.safeParse(formattedValue);

    setErrors((prev) => {
      const updated = { ...prev };
      if (!result.success) {
        updated[index] = result.error.issues[0].message;
      } else {
        delete updated[index];
      }
      return updated;
    });
  };

  const closeAllDropdowns = () => {
    setOpenDiagnosis(null);
    setOpenRoute(null);
    setOpenDosageTime(null);
    setOpenPharmacy(null);
  };
  useImperativeHandle(ref, () => ({
    validate() {
      return rows.every((r) =>
      r.diagnosis && r.medication && r.dosage &&
    r.frequency && r.route && r.startDate && r.dosageTime );
    },
    }));

  return (
    <div className="border rounded-xl bg-white mt-4">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b rounded-t-xl cursor-pointer"
        onClick={() => setSectionOpen(!sectionOpen)}>
        <span className="font-medium text-gray-800">Add Prescriptions</span>
        <img src="/images/fi_chevron-down.svg" alt="downicon"
          className={`w-5 h-5 transition-transform ${sectionOpen ? "rotate-180" : ""}`} />
      </div>

      {sectionOpen && (
        <div className="px-4 pb-4 overflow-y-auto">
          <div className="max-h-[290px]">
              <div className="mt-3">
              <label className="text-xs text-gray-500">Remarks</label>
              <input
                className="mt-1 w-full h-[65px] px-3 pb-7 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Remarks"
                onFocus={closeAllDropdowns}
                value={rows[0].remarks}
                onChange={(e) =>
                  handleChange(0, "remarks", e.target.value)} />
            </div>
            {rows.map((row, index) => (
              <div key={index} className="mt-4 p-3 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-9 gap-3 items-end">
                  <div className="relative ">
                    <label className="text-xs text-gray-500">Diagnosis<span className="text-red-500">*</span></label>
                    <div ref={diagnosisRef} onClick={() => {closeAllDropdowns(); setOpenDiagnosis(openDiagnosis === index ? null : index);}}
                      className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between curcor-pointer focus:ontline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <span className={row.diagnosis ? "" : "text-gray-400"}>{row.diagnosis || "Select"}</span>
                      <img src="/images/fi_chevron-down.svg" alt="downicon" className={`w-4 h-4 ${openDiagnosis === index ? "rotate-180" : ""}`} />
                    </div>
                    {openDiagnosis === index && (
                      <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow">
                        {diagnosisOptions.map((d) => (
                          <div
                            key={d}
                            onClick={() => {
                              handleChange(index, "diagnosis", d);
                              setOpenDiagnosis(null);
                            }}
                            className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer">
                            {d}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label className="text-xs text-gray-500">
                      Medication Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Medication"
                      onFocus={closeAllDropdowns}
                      value={row.medication}
                      onChange={(e) =>
                        handleChange(index, "medication", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Dosage<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Dosage"
                      onFocus={closeAllDropdowns}
                      value={row.dosage}
                      onChange={(e) =>
                        handleChange(index, "dosage", e.target.value)} />
                  </div>
                  <div className="relative">
                    <label className="text-xs text-gray-500">
                      Frequency<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Frequency"
                      onFocus={closeAllDropdowns}
                      value={row.frequency}
                      onChange={(e) =>
                        handleChange(index, "frequency", e.target.value)} />
                  </div>

                  <div className=" relative">
                    <label className="text-xs text-gray-500">
                      Route<span className="text-red-500">*</span>
                    </label>
                    <div
                      ref={routeRef}
                      onClick={() => {closeAllDropdowns(); setOpenRoute(openRoute === index ? null : index);}}
                      className="mt-1 h-9 px-3 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <span className={row.route ? "text-gray-900" : "text-gray-400"}>
                        {row.route || "Select"}
                      </span>
                      <img
                        src="/images/fi_chevron-down.svg" alt="downicon"
                        className={`w-4 h-4 transition-transform ${openRoute === index ? "rotate-180" : ""}`} />
                    </div>

                    {openRoute === index && (
                      <div
                        className="absolute z-50 w-full mt-1 rounded-xl border border-gray-200 bg-white shadow-md">
                        {routeOptions.map((r) => (
                          <div
                            key={r}
                            onClick={() => {
                              handleChange(index, "route", r);
                              setOpenRoute(null);
                            }}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100">
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <label className="text-xs text-gray-500">
                      Start Date<span className="text-red-400">*</span>
                    </label>

                    <DateYearCalendar
                      value={row.startDate}
                      onOpen={closeAllDropdowns}
                      onChange={(formatted, raw) => {
                        handleChange(index, "startDate", formatted);
                        validateStartDate(index, raw, formatted);
                      }}
                      placeholder="DD/MM/YYYY"
                      className=" h-9"/>
                    {errors[index] && (
                      <p className="text-xs text-red-500 mt-1">{errors[index]}</p>
                    )}
                  </div>

                  <div className="ml-">
                    <label className="text-xs text-gray-500">Duration</label>
                    <input
                      className="mt-1 w-full h-9 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Duration"
                      onFocus={closeAllDropdowns}
                      value={row.duration}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      } />
                  </div>
                  <div className="relative">
                    <label className="text-xs text-gray-500">Dosage Time<span className="text-red-400">*</span></label>
                    <div
                      ref={dosageTimeRef}
                      onClick={() => { closeAllDropdowns();
                        setOpenDosageTime(
                          openDosageTime === index ? null : index
                        );
                      }}
                      className="mt-1 h-9 px-3 border rounded-lg flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <span className={row.dosageTime ? "" : "text-gray-400"}>
                        {row.dosageTime || "AF"}
                      </span>
                      <img
                        src="/images/fi_chevron-down.svg" alt="downicon"
                        className={`w-4 h-4 ${openDosageTime === index ? "rotate-180" : ""}`} />
                    </div>

                    {openDosageTime === index && (
                      <div
                        className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow">
                        {dosageTimeOptions.map((t) => (
                          <div
                            key={t}
                            onClick={() => {
                              handleChange(index, "dosageTime", t);
                              setOpenDosageTime(null);
                            }}
                            className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer">
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-centern gap-2">
                    {index === 0 && (
                      <button
                        onClick={addRow}
                        className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                        <img src="/images/u_plus(1).svg" alt="plus" className="w-4 h-4" />
                      </button>
                    )}
                    { index > 0 && (
                    <button
                      onClick={() => deleteRow(index)}
                      className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100">
                      <img src="/images/u_trash.svg" alt="trash" className="w-4 h-4" />
                    </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          
            <div className="pb-4 border-b border-gray-200"></div>

            <div className="flex">
              <div className="mt-1.5 pt-4  border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Suggest a Pharmacy
                </p>

                {pharmacies.map((p, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-end gap-3 mt-2">
                    <div className=" relative w-[471px]">
                      <div
                        ref={pharmacyRef}
                        onClick={() => { closeAllDropdowns();
                          setOpenPharmacy(openPharmacy === i ? null : i);
                        }}
                        className="h-9 px-3 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <span className={p ? "text-gray-900" : "text-gray-400"}>
                          {p || "Select"}
                        </span>
                        <img
                          src="/images/fi_chevron-down.svg" alt="downicon"
                          className={`w-4 h-4 transition-transform ${openPharmacy === i ? "rotate-180" : ""}`} />
                      </div>

                      {openPharmacy === i && (
                        <div
                          className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-md" >
                          {pharmacyOptions.map((ph) => (
                            <div
                              key={ph}
                              onClick={() => {
                                const updated = [...pharmacies];
                                updated[i] = ph;
                                setPharmacies(updated);
                                setOpenPharmacy(null);
                              }}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100">
                              {ph}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* <div className="flex gap-2">
                      {i === 0 && (
                        <button
                          onClick={addPharmacy}
                          className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                          <img
                            src="/images/u_plus(1).svg"
                            alt="plus"
                            className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deletePharmacy(i)}
                        className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100">
                        <img
                          src="/images/u_trash.svg"
                          alt="delete"
                          className="w-4 h-4"
                        />
                      </button>
                    </div> */}

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
export default AddPrescriptions;