import React, { useRef, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  label: string;
  codeName: string;
  numberName: string;
  register: UseFormRegister<any>;
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
  register,
  errors,
  countryCodes,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { ref: rhfRef, ...restCodeRegister } = register(codeName);
  const { ref: numberRef, onChange, ...restNumberRegister } = register(numberName);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  onChange(e);
  
  if (!/^[0-9]*$/.test(value)) {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    onChange({
      ...e,
      target: { ...e.target, value: cleanedValue }
    });
  }
};

  const openDropdown = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold block text-gray-400 mb-1">{label}</label>

      <div className="flex items-center border border-gray-300 rounded-xl bg-white px-1 h-[44px] text-sm
                focus-within:ring-2 focus-within:ring-blue-500 relative">

        <div className="relative flex items-center">
          <select
            ref={(el) => {
              selectRef.current = el;
              rhfRef(el);
            }}
            {...restCodeRegister}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
            className="appearance-none bg-transparent outline-none pr-6 pl-2 cursor-pointer"
          >
            {countryCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <img
            src="/images/fi_chevron-down.svg"
            className={`w-5 h-5 absolute right-2 pt-0.5 cursor-pointer transition-transform
              ${isOpen ? "rotate-180" : "rotate-0"}`}
            onClick={openDropdown}
          />
        </div>

        <div className="w-[0.2px] bg-gray-300 h-10.5 mx-2 self-stretch"></div>

        <input
          type="text"
          placeholder="Enter phone"
          {...restNumberRegister}
          ref={numberRef}
          onChange={handleNumberChange}
          className="flex-1 bg-transparent outline-none"
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
