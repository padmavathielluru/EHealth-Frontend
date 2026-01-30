import React, { useEffect, useRef, useState } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface GenderInputFieldProps {
  label: string;
  name: string;
  options: string[];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const GenderInputField: React.FC<GenderInputFieldProps> = ({
  label,
  name,
  options,
  setValue,
  watch,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const value = watch(name);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm text-gray-400 mb-2">
        {label.replace("*", "")}
        {label.includes("*") && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between h-[44px] px-4 rounded-xl border cursor-pointer bg-white
          focus:outline-none focus:ring-1 focus:ring-blue-500
          ${value ? "text-gray-900" : "text-gray-400"}`}>
        <span>{value || "Select"}</span>

        <img
          src="/images/fi_chevron-down.svg"
          className={`w-5 h-5 transition-transform duration-200
            ${open ? "rotate-180" : ""}
            ${value ? "opacity-100" : "opacity-50"}
          `}/>
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow-md">
          {options.map((g) => (
            <div
              key={g}
              onClick={() => {
                setValue(name, g, { shouldValidate: true });
                setOpen(false);
              }}
              className="h-[36px] px-4 flex items-center text-sm cursor-pointer
                hover:bg-blue-100 rounded-lg mx-1">
              {g}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{(error as any).message}</p>
      )}
    </div>
  );
};

export default GenderInputField;
