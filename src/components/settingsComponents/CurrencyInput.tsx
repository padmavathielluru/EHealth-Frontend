import React, { useState, useRef, useEffect } from "react";
import { CurrencyInputProps } from "../../interfaces/costInterface";

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, currencies }) => {
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
        className="relative flex w-[320px] h-[40px] border rounded-lg overflow-visible focus-within:ring-1 focus-within:ring-blue-500">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center px-3 text-gray-600 border-r cursor-pointer select-none">
          {currency}
        </div>

        {open && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-md z-20">
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
          type="number"
          defaultValue={500}
          className="flex-1 px-3 text-sm outline-none rounded-r-lg"/>
      </div>
    </div>
  );
};

export default CurrencyInput;
