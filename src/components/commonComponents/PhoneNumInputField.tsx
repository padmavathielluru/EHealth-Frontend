import React, { useEffect, useRef, useState } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface Props {
  label: string;
  codeName: string;
  numberName: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors?: {
    code?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    number?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  };
  countryCodes: string[];
}

const PhoneNumInputField: React.FC<Props> = ({
  label,
  codeName,
  numberName,
  setValue,
  watch,
  errors,
  countryCodes,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const selectedCode = watch(codeName);
  const phoneNumber = watch(numberName);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      setValue(numberName, cleanedValue, { shouldValidate: true });
    } else {
      setValue(numberName, value, { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm block text-gray-400">{label}</label>

      <div className="flex items-center border border-gray-300 rounded-xl bg-white h-[44px] px-1 focus-within:ring-2 focus-within:ring-blue-500 relative">
        
        {/* Country Code Dropdown */}
        <div ref={ref} className="relative w-15">
          <div
            onClick={() => setOpen(!open)}
            className={`flex items-center justify-between h-[35px] px-3  cursor-pointer bg-white
              ${selectedCode ? "text-gray-900" : "text-gray-400"} focus:outline-none`}
          >
            <span>{selectedCode || "Code"}</span>
            <img
              src="/images/fi_chevron-down.svg"
              className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          {open && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow-md">
              {countryCodes.map((c) => (
                <div
                  key={c}
                  onClick={() => {
                    setValue(codeName, c, { shouldValidate: true });
                    setOpen(false);
                  }}
                  className="h-[36px] px-4 flex items-center text-sm cursor-pointer hover:bg-blue-100 rounded-lg mx-1"
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-[0.2px] bg-gray-300 h-10.5 mx-2 self-stretch"></div>

        {/* Phone Number Input */}
        <input
          type="text"
          placeholder="Enter phone"
          value={phoneNumber || ""}
          onChange={handleNumberChange}
          className="flex-1 bg-transparent outline-none px-2"
        />
      </div>

      {errors?.code && (
        <p className="text-red-500 text-sm">{(errors.code as any).message}</p>
      )}
      {errors?.number && (
        <p className="text-red-500 text-sm">{(errors.number as any).message}</p>
      )}
    </div>
  );
};

export default PhoneNumInputField;
