import React from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const EmailInputField: React.FC<Props> =({
    label,
    name,
    placeholder,
    register,
    error,
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">
                {label.replace("*", "")}
                {label.includes("*") && (
                    <span className="text-red-500 ml-1">*</span>
                )}
                </label>

            <input
            type="email"
            placeholder={placeholder}
            {...register(name, {setValueAs: (value) => value.trim(),
                
            })}
            className={`w-full px-3 h-[44px] border border-gray-300 rounded-xl bg-white text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                 ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            }`}
            />

            {error && (
            <p className="text-red-600 text-sm">{(error as any).message}</p>
            )}
        </div>
    );
};

export default EmailInputField;