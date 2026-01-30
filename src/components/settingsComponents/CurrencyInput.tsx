import React, { useState, useRef, useEffect } from "react";
import { CurrencyInputProps } from "../../interfaces/costInterface";

const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  label,
  fieldName,
  currencies,
  register,
  error, }) => {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const ref = useRef<HTMLDivElement>(null);

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
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <div
        ref={ref}
        className={`relative flex w-full max-w-[320px] h-[40px] border rounded-lg overflow-visible
        ${error ? "border-red-400" : "border-gray-300"}
        focus-within:ring-1 focus-within:ring-blue-500`}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center px-3 text-gray-600 border-r cursor-pointer select-none">
          {currency}
        </div>

        {open && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-md z-20 w-full">
            {currencies.map((c: string) => (
              <div
                key={c}
                onClick={() => {
                  setCurrency(c);
                  setOpen(false);
                }}
                className="w-[60px] h-[32px] flex items-center justify-center text-sm hover:bg-blue-100 cursor-pointer">
                {c}
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          {...register(fieldName)}
         placeholder="Enter Amount"
          className="flex-1 px-3 text-sm outline-none rounded-r-lg"/>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default CurrencyInput;
