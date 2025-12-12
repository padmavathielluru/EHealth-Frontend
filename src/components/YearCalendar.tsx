import React, { useState, useRef, useEffect } from "react";

interface YearCalendarProps {
    label?: string;
    value: string;
    onChange: (val: string) => void;
}

const YearCalendar: React.FC<YearCalendarProps> = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const currentYear = new Date().getFullYear();

    const pastYears = 50;       
    const futureYears = 5;      

    const years = Array.from(
        { length: pastYears + futureYears + 1 },
        (_, i) => currentYear + futureYears - i
    );

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && <label className="text-sm font-semibold text-gray-500">{label}</label>}

            <div className="w-full mt-1 h-[40px] border border-gray-200 rounded-xl px-3 flex items-center justify-between">
                <span className="text-gray-600 text-sm">{value || ""}</span>

                <img
                    src="/images/fi_calendar (2).svg"
                    alt="calendar"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>

            {open && (
                <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white shadow-md border border-gray-200 rounded-xl">
                    {years.map((yr) => (
                        <div
                            key={yr}
                            onClick={() => {
                                onChange(String(yr));
                                setOpen(false);
                            }}
                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                            {yr}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YearCalendar;
