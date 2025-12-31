import React from "react";

interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  name?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
  name = "",
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label className="mb-2 mt-2 text-sm text-gray-400">
          {label}
          {/* {required && <span className="text-red-500">*</span>} */}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border w-[320px] h-[40px] rounded-lg px-3 py-2 text-sm outline-none 
          focus:ring-2 focus:ring-blue-300 
          focus:border-blue-300 
          disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
    </div>
  );
};

export default InputField;
