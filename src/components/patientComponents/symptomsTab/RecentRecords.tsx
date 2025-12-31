import React, { useEffect, useState } from "react";
import Searchbar from "../../Searchbar";
import DateYearCalendar from "../../commonComponents/DateYearCalendar";
import { TABLE_HEADERS } from "../../../utils/recentRecordsConstants";
import { recentRecordsService } from "../../../services/recentRecordsService";
import { RecentRecord } from "../../../interfaces/recentRecordsInterface";

const RecentRecords: React.FC = () => {
    const [records, setRecords] = useState<RecentRecord[]>([]);

    const [date, setDate] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [recordedBy, setRecordedBy] = useState("");
    const [severity, setSeverity] = useState("");
    const [doctorNote, setDoctorNote] = useState("");
    const [actions, setActions] = useState("");

    useEffect(() => {
        recentRecordsService.getRecentRecords().then(
            (res: RecentRecord[]) => {
                setRecords(res);
            }
        );
    }, []);

    return (
        <div className="bg-white border rounded-xl p-4">
            <p className="text-sm font-semibold mb-4">RECENT RECORDS</p>

            <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full border border-gray-200 border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 h-12">
                            {TABLE_HEADERS.map((h) => (
                                <th key={h} className="text-left px-2 py-2 font-medium border border-gray-200">
                                    {h}
                                </th>
                            ))}
                        </tr>

                        <tr className="border-t">
                            <td className="px-2 py-2 w-[140px]">
                                <DateYearCalendar
                                    value={date}
                                    onChange={(v) => setDate(v)} />
                            </td>

                            <td className="px-2 py-2 border border-gray-200">
                                <Searchbar placeholder="Search ..." value={symptoms} onChange={setSymptoms} />
                            </td>

                            <td className="px-2 py-2 border border-gray-200">
                                <Searchbar placeholder="Search ..." value={recordedBy} onChange={setRecordedBy} />
                            </td>

                            <td className="px-2 py-2 border border-gray-200">
                                <Searchbar placeholder="Search ..." value={severity} onChange={setSeverity} />
                            </td>

                            <td className="px-2 py-2 border border-gray-200">
                                <Searchbar placeholder="Search ..." value={doctorNote} onChange={setDoctorNote} />
                            </td>

                            <td className="px-2 py-2 border border-gray-200">
                                <Searchbar placeholder="Search ..." value={actions} onChange={setActions} />
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((row: RecentRecord, i: number) => (
                            <tr key={i} className="border-t text-sm">
                                <td className="px-2 py-3 border border-gray-200">{row.recordedOn}</td>
                                <td className="px-2 py-3 font-medium border border-gray-200">{row.symptoms}</td>
                                <td className="px-2 py-3 text-gray-600 border border-gray-200">{row.recordedBy}</td>
                                <td className="px-2 py-3 border border-gray-200">
                                    <span className={`px-2 py-1 text-xs rounded-md font-semibold
                                        ${row.severity === "SEVERE" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
                                        {row.severity}</span></td>
                                <td className="px-2 py-3 text-gray-600 border border-gray-200">{row.doctorNote}</td>
                                <td className="px-2 py-3 border border-gray-200">
                                    <div className="flex gap-2">
                                        <button className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-600 flex items-center gap-1">
                                            DIAGNOSIS
                                            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                                                <img
                                                    src="/images/fi_arrow-up-right.svg"
                                                    alt="arrow"
                                                    className="w-3"
                                                />
                                            </span>
                                        </button>
                                        <button className="text-xs px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 flex items-center gap-2">
                                            MEDIACATION
                                            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                                                <img
                                                    src="/images/fi_arrow-up-right.svg"
                                                    alt="arrow"
                                                    className="w-3"
                                                />
                                            </span>
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-lg leading-none">...</span>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default RecentRecords;