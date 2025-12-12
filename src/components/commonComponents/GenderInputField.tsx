import React, { useRef, useState } from "react";
import {
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface GenderInputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  options: string[];
}

const GenderInputField: React.FC<GenderInputFieldProps> = ({
  label,
  name,
  register,
  error,
  options,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { ref, ...restRegister } = register(name);

  const openDropdown = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    }
  };

  return (
    <div className="relative">
      <label className="font-semibold block text-gray-400 mb-2">{label}</label>

      <select
        ref={(el) => {
          selectRef.current = el;
          ref(el);
        }}
        {...restRegister}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        defaultValue=""
        className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
        text-gray-900
        [color:var(--placeholder-color)]"
      >
        <option value="" disabled className="text-gray-400">
          Select Gender
        </option>

        {options.map((g) => (
          <option key={g} value={g} className="text-black">
            {g}
          </option>
        ))}
      </select>

      <img
        src="/images/fi_chevron-down.svg"
        className={`w-5 h-5 absolute right-4 top-[45px] cursor-pointer transition-transform
          ${isOpen ? "rotate-180" : "rotate-0"}`}
        onClick={openDropdown}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">{(error as any).message}</p>
      )}
    </div>
  );
};

export default GenderInputField;
