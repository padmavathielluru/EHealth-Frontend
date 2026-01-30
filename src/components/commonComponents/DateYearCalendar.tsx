import React, { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (formattedValue: string, rawValue: string) => void;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
  onOpen?: () => void;
}

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DateYearCalendar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  hasError = false,
  className = "",
  onOpen,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(new Date());
  const [monthOpen, setMonthOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatInput = (val: string) => {
    const n = val.replace(/\D/g, "");
    if (n.length <= 2) return n;
    if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
    return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4, 8)}`;
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatInput(e.target.value), e.target.value);
  };

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const selectDate = (day: number) => {
    const d = String(day).padStart(2, "0");
    const m = String(month + 1).padStart(2, "0");
    const formatted = `${d}/${m}/${year}`;
    onChange(formatted, formatted);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleTyping}
        onFocus={() => onOpen?.()}
        placeholder={placeholder}
        maxLength={10}
        className={`w-full h-[44px] px-3 pr-8 border rounded-xl text-sm
        focus:outline-none focus:ring-1
        ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
          }`}
      />
      <img
        src="/images/fi_calendar (2).svg" alt="calender"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
        onClick={() => {onOpen?.(); setOpen((p) => !p);}}
      />

      {open && (
        <div className="absolute z-50 top-full mt-1 w-[280px] bg-white border rounded-xl shadow-lg p-3">

          <div className="flex gap-2 mb-2">
            <div className="relative w-full">
              <div
                onClick={() => setMonthOpen((p) => !p)}
                className={`w-full h-[44px] px-2 pr-2 border rounded-md text-sm
    flex items-center justify-between cursor-pointer 
      ${monthOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"}`}
              >
                <span>{months[month]}</span>

                <img
                  src="/images/fi_chevron-down.svg" alt="down"
                  className={`w-5 transition-transform duration-200
        ${monthOpen ? "rotate-180" : ""}`}
                />
              </div>
              {monthOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-md max-h-40 overflow-y-auto">
                  {months.map((m, i) => (
                    <div
                      key={m}
                      onClick={() => {
                        setCurrent(new Date(year, i, 1));
                        setMonthOpen(false);
                      }}
                      className="px-2 py-1 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="number"
              value={year}
              onChange={(e) =>
                setCurrent(new Date(Number(e.target.value), month, 1))
              }
              className="w-[90px] h-8 border rounded-md text-sm px-2 pr-2  
                    appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-1">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm text-center">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={i}></span>
            ))}

            {Array.from({ length: totalDays }).map((_, i) => (
              <button
                key={i}
                onClick={() => selectDate(i + 1)}
                className="h-8 rounded hover:bg-blue-100"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateYearCalendar;
