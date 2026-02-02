import React, { useState, useRef, useEffect } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownInputFieldProps {
  label: string;
  name: string;
  options: DropdownOption[];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const DropdownInputField: React.FC<DropdownInputFieldProps> = ({
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
    setValue(name, value ?? "", { shouldValidate: false});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm text-gray-400 mb-2">
        {(label || "").replace("*", "")}
        {label?.includes("*") && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between h-[44px] px-4 rounded-xl border border-gray-300 cursor-pointer bg-white
          focus:outline-none focus:ring-1 focus:ring-blue-500
          ${value ? "text-gray-900" : "text-gray-400"}
        `}>
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
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setValue(name, opt.value, { shouldValidate: true });
                setOpen(false);
              }}
              className="h-[36px] px-4 flex items-center text-sm cursor-pointer
                hover:bg-blue-100 rounded-lg mx-1">
              {opt.label}
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

export default DropdownInputField;
