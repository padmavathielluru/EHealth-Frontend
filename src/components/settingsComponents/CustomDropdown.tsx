import React, { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  label?: string;
  options: string[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hasValue = !value;

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
      {label && (
        <label className="block text-sm text-gray-400 mb-2">
         {label.replace("*", "")}
        {label.includes("*") && (
          <span className="text-red-500 ml-1">*</span>
        )}
        </label>
      )}

      <div
        onClick={() => setOpen(!open)}
        tabIndex={0}
        className={`flex items-center justify-between w-[370px] h-[44px] px-4 rounded-xl border cursor-pointer bg-white
          focus:outline-none focus:ring-1 focus:ring-blue-500
          ${hasValue ? "text-gray-900" : "text-gray-400"}
        `}
      >
        <span className={hasValue ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>

        <img
          src="/images/fi_chevron-down.svg"
          alt="dropdown"
          className={`w-5 h-5 transition-transform duration-200
            ${open ? "rotate-180" : ""}
            ${hasValue ? "opacity-100" : "opacity-50"}
          `}
        />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-[370px] bg-white border rounded-xl shadow-md">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="h-[36px] px-4 flex items-center text-sm hover:bg-blue-100 cursor-pointer text-gray-800"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
