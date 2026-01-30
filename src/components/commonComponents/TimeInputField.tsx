import React, { useState, useEffect, useRef } from "react";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface TimeInputFieldProps {
  label: string;
  name: string;
  meridiemName: string;
  value: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  meridiem: "AM" | "PM";
  error?: string;
  trigger?: UseFormTrigger<any>;
}

const TimeInputField: React.FC<TimeInputFieldProps> = ({
  label,
  name,
  meridiemName,
  register,
  setValue,
  meridiem,
  value,
}) => {
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">(meridiem || "AM");

  const [timeOpen, setTimeOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meridiem) {
      setPeriod(meridiem);
    }
  }, [meridiem]);

  useEffect(() => {
    if (value) {
      let [h, m] = value.split(":");
      setHour(h.padStart(2, "0"));
      setMinute(m.padStart(2, "0"));
    }
  }, [value]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setTimeOpen(false);
        setPeriodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTime = (h = hour, m = minute, p = period) => {
    setValue(name, `${h}:${m}`, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue(meridiemName, p, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setTimeout(() => {
    }, 0);
  };

  useEffect(() => {
    if (!value) {
      setHour("");
      setMinute("");
      setPeriod(meridiem || "AM");
      return;
    }
    const [h, m] = value.split(":");
    setHour(h.padStart(2, "0"));
    setMinute(m.padStart(2, "0"));
  }, [value, meridiem]);


  return (
    <div ref={wrapperRef} className="w-[180px]">
      <p className="text-sm text-gray-400 mt-2 mb-1">{label}</p>
      <div className={`relative w-[180px] h-[42px] bg-white border rounded-2xl flex items-center px-4`}>

        <img
          src="/images/Icon.svg" alt="clock"
          className="w-4 h-4 cursor-pointer"
          onClick={() => { setTimeOpen(!timeOpen); setPeriodOpen(false); }} />

        <input
          {...register(name, {
            required: `${label} is required`,
          })}
          readOnly
          value={hour && minute ? `${hour}:${minute}` : ""}
          className="ml-3 w-[60px] text-base font-semibold bg-transparent outline-none" />

        <div className="absolute right-[72px] top-0 bottom-0 w-px bg-gray-200" />

        <button
          type="button"
          onClick={() => {
            setPeriodOpen(!periodOpen);
            setTimeOpen(false);
          }}
          className="absolute right-3 flex items-center gap-1 font-medium">
          {period}
          <img
            src="/images/fi_chevron-down.svg" alt="down"
            className={`w-4 h-4 transition-transform ${periodOpen ? "rotate-180 font-semibold" : ""
              }`} />
        </button>

        {periodOpen && (
          <div className="absolute right-3 top-[35px] w-[64px] bg-white border rounded-xl shadow-lg z-20">
            {["AM", "PM"].map((p) => (
              <div
                key={p}
                onClick={() => {
                  setPeriod(p as "AM" | "PM");
                  setPeriodOpen(false);
                  updateTime(hour, minute, p as "AM" | "PM");
                }}
                className="py-2 text-sm font-medium text-center cursor-pointer hover:bg-blue-100">
                {p}
              </div>
            ))}
          </div>
        )}

        {timeOpen && (
          <div className="absolute left-0 top-[35px] flex gap-3 bg-white border rounded-2xl shadow-xl p-2 z-50">
            <div className="h-40 w-10 overflow-y-auto text-center">
              {Array.from({ length: 12 }).map((_, i) => {
                const h = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={h}
                    onClick={() => {
                      setHour(h);
                      updateTime(h, minute);
                      // setTimeOpen(false);
                    }}
                    className={`py-1 rounded cursor-pointer ${hour === h
                      ? "bg-gray-200 font-medium"
                      : "hover:bg-blue-100"
                      }`}>
                    {h}
                  </div>
                );
              })}
            </div>

            <div className="h-40 w-12 overflow-y-auto text-center">
              {Array.from({ length: 60 }).map((_, i) => {
                const m = String(i).padStart(2, "0");
                const isActive = minute === m;
                return (
                  <div
                    key={m}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      setMinute(m);
                      updateTime(hour, m);
                      setTimeOpen(false);
                    }}
                    className={`py-1 rounded cursor-pointer ${isActive
                      ? "bg-gray-200 font-medium"
                      : "hover:bg-blue-100"
                      }`}>
                    {m}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeInputField;
