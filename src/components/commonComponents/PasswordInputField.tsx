import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { resetPasswordSchema } from "./schema";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  showStrength?: boolean;
}

const getPasswordStrength = (value: string) => {
  if (value.length < 6) return "Weak";

  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value); // ✅ fixed

  const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  if (score >= 3 && value.length >= 8) return "Strong";
  if (score >= 2) return "Medium";

  return "Weak";
};

const PasswordInputField: React.FC<Props> = ({
  label,
  name,
  placeholder,
  register,
  error,
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const strength = getPasswordStrength(value);

  const strengthColor = {
    Weak: "text-red-500",
    Medium: "text-yellow-500",
    Strong: "text-green-600",
  }[strength];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name, {
            onChange: (e) => setValue(e.target.value),
          })}
          className={`border text-sm px-3 pr-10 py-2 h-[40px] w-full rounded-xl transition focus:outline-none
      ${error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-blue-400 focus:border-blue-500"}`} />
        {value && (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
        )}
      </div>

      {showStrength && value && !error && (
        <p className={`text-xs mt-1 ${strengthColor}`}>
          Password strength: <span className="font-medium">{strength}</span>
        </p>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default PasswordInputField;
