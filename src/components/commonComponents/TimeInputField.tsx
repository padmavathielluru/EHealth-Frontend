import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue, FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  meridiemName: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  value: string;
  meridiem: string;
  error?: FieldError;
}

const generateSlots = () => {
  const list: string[] = [];
  for (let h = 1; h <= 12; h++) {
    const hh = h.toString().padStart(2, "0");
    list.push(`${hh}:00`);
    list.push(`${hh}:30`);
  }
  return list;
};

const timeSlots = generateSlots();

const TimeInputField: React.FC<Props> = ({
  label,
  name,
  meridiemName,
  register,
  setValue,
  value,
  meridiem,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9:]/g, "");

    if (v.length === 2 && value.length < 2) v += ":";
    if (v.length > 5) return;

    setValue(name, v);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 font-medium">{label}</label>

      <div className="flex items-center gap-3">
        
       
        <div className="relative">
          <div className="flex items-center border rounded-xl px-3 py-2 w-28 bg-white shadow-sm gap-2">
            <img
              src="/images/Icon.svg"
              className="w-4 h-4 cursor-pointer opacity-60"
              onClick={() => setOpen(!open)}
            />

            <input
              {...register(name)}
              maxLength={5}
              value={value}
              onChange={handleInput}
              placeholder="hh:mm"
              className="outline-none font-medium w-full"
            />
          </div>

          {open && (
            <div className="absolute bg-white shadow-md rounded-lg w-28 mt-1 max-h-56 overflow-y-auto z-50">
              {timeSlots.map((t) => (
                <div
                  key={t}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setValue(name, t);
                    setOpen(false);
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

       
        <select
          {...register(meridiemName)}
          value={meridiem}
          onChange={(e) => setValue(meridiemName, e.target.value)}
          className="border rounded-xl py-2 px-3 shadow-sm bg-white"
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default TimeInputField;
