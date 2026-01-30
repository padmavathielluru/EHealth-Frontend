import React, { useState, useRef, useImperativeHandle } from "react";
import { symptomsSchema } from "../../../schemas/schema";

interface SymptomRow {
    symptoms: string;
    severity: string;
    started: string;
    details: string;
}

const severityOptions = ["Mild", "Medium", "Severe"];
const startedOptions = ["Today", "Yesterday", "Last Week"];

const emptyRow: SymptomRow = { symptoms: "", severity: "", started: "", details: "", };

const EnterSymptoms = React.forwardRef<any>((_, ref) => {
    const [sectionOpen, setSectionOpen] = useState<boolean>(false);
    const [openSeverity, setOpenSeverity] = useState<number | null>(null);
    const [openStarted, setOpenStarted] = useState<number | null>(null);

    const [rows, setRows] = useState<SymptomRow[]>([{ ...emptyRow }]);
    const [errors, setErrors] = useState<Record<number, string>>({});
    const severityRef = useRef<HTMLDivElement | null>(null);
    const startedRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (
        index: number, field: keyof SymptomRow, value: string) => {
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

    const handleSymptomsChange = (index: number, value: string) => {
        const result = symptomsSchema.safeParse(value);

        setErrors((prev) => ({
            ...prev,
            [index]: result.success ? "" : result.error.issues[0].message,
        }));

        const updated = [...rows];
        updated[index].symptoms = value;
        setRows(updated);
    };

    const closeAllDropdowns = () => {
        setOpenSeverity(null);
        setOpenStarted(null);
    };

    useImperativeHandle(ref, () => ({
        validate() {
            return rows.every(
                (r) => r.symptoms && r.severity && r.started
            );
        },
    }));

    return (
        <div className="border rounded-xl bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 curcor-pointer rounded-t-xl border-b"
                onClick={() => setSectionOpen(!sectionOpen)}>
                <span className="font-medium text-gray-800">Enter Symptoms</span>
                <img src="/images/fi_chevron-down.svg" alt="down"
                    className={`w-5 h-5 transition-transform ${sectionOpen ? "rotate-180" : ""}`} />
            </div>

            {sectionOpen && (
                <div className="px-4 pb-4 overflow-y-auto max-h-[260px] pr-1">
                    <div className="">
                        {rows.map((row, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row md:item-end items-end gap-3 px-2 py-2 bg-white">
                                <div className="flex-1 w-full md:w-36 relative">
                                    <label className="text-xs text-gray-500">
                                        Symptoms<span className="text-red-500">*</span></label>
                                    <input placeholder="Enter Symptoms" onClick={closeAllDropdowns}
                                        value={row.symptoms}
                                        onChange={(e) => handleSymptomsChange(index, e.target.value)}
                                        className={`mt-1 w-full h-9 px-3 text-sm border rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                        ${errors[index] ? "border-red-500" : "border-gray-200"} `} />
                                    {errors[index] && (
                                        <p className="mt-1 text-xs text-red-500">{errors[index]}</p>
                                    )}
                                </div>

                                <div className="w-full md:w-36 relative">
                                    <label className="text-xs font-medium text-gray-500">
                                        Severity<span className="text-red-500">*</span>
                                    </label>
                                    <div ref={severityRef}
                                        className="w-full mt-1 h-9 rounded-xl border border-gray-200 px-3 text-sm flex items-center justify-between 
                                                    cursor-pointer bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        onClick={() => {
                                            setOpenSeverity(openSeverity === index ? null : index)
                                            setOpenStarted(null)
                                        }} >
                                        <span className={row.severity ? "text-gray-900" : "text-gray-400"}>
                                            {row.severity || "Select"}
                                        </span>
                                        <img src="/images/fi_chevron-down.svg" alt="down"
                                            className={`w-4 h-4 transition-transform duration-200
                                                ${openSeverity === index ? "rotate-180" : ""}`} />
                                    </div>

                                    {openSeverity === index && (
                                        <div className="fixed z-20 w-[150px] mt-1 rounded-xl border border-gray-200 bg-white shadow-md">
                                            {severityOptions.map((s) => (
                                                <div key={s}
                                                    onClick={() => {
                                                        handleChange(index, "severity", s); setOpenSeverity(null);
                                                    }}
                                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 rounded-lg ">
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full md:w-36 relative">
                                    <label className="text-xs font-medium text-gray-500">
                                        Started<span className="text-red-500">*</span>
                                    </label>
                                    <div ref={startedRef}
                                        className="w-full mt-1 h-9 rounded-xl border border-gray-200 px-3 text-sm flex items-center justify-between cursor-pointer bg-white 
                                                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        onClick={() => {
                                            setOpenStarted(openStarted === index ? null : index)
                                            setOpenSeverity(null);
                                        }}>
                                        <span className={row.started ? "text-gray-900" : "text-gray-400"}>
                                            {row.started || "Select"}
                                        </span>
                                        <img src="/images/fi_chevron-down.svg" alt="down"
                                            className={`w-4 h-4 transition-transform duration-200
                                                ${openStarted === index ? "rotate-180" : ""}`} />
                                    </div>

                                    {openStarted === index && (
                                        <div className="fixed z-50 w-[150px] mt-1 rounded-xl border border-gray-200 bg-white shadow-md">
                                            {startedOptions.map((s) => (
                                                <div
                                                    key={s}
                                                    onClick={() => {
                                                        handleChange(index, "started", s);
                                                        setOpenStarted(null);
                                                    }}
                                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 rounded-lg">
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full md:flex-[2]">
                                    <label className="text-xs text-gray-500">Associated symptoms or details</label>
                                    <input placeholder="Enter details" onClick={closeAllDropdowns}
                                        value={row.details} onChange={(e) => handleChange(index, "details", e.target.value)}
                                        className="mt=1 w-full h-9 px-3 text-sm border rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="flex items-center w-[76px] gap-2 ">
                                    {index === 0 && (
                                        <button
                                            onClick={addRow}
                                            className="w-9 h-9 border border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100">
                                            <img src="/images/u_plus(1).svg" alt="plus" className="w-4 h-4" />
                                        </button>
                                    )}
                                    {index > 0 && (
                                        <button
                                            onClick={() => deleteRow(index)}
                                            className="w-9 h-9 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-200">
                                            <img src="/images/u_trash.svg" alt="delete" className="w-4 h-4" />
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
});

export default EnterSymptoms;


