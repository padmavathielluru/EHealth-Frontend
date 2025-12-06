import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const PasswordInputField: React.FC<Props> = ({
  label,
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      <input
        type="password"
        placeholder={placeholder}
        {...register(name)}
        className={`border px-3 py-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default PasswordInputField;
