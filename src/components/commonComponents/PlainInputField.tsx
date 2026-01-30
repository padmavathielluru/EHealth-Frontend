import React from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    onlyAlphabets?: boolean;
    min?:number;
    step?:number;
}

const PlainInputField = ({ 
    label, 
    name, 
    type = "text",
    placeholder,
    register, 
    error, 
    min,
    step,
    onlyAlphabets, 
}: Props) => {
    const { onChange, ...rest} = register(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">
                {label.replace("*", "")}
                {label.includes("*") && (
                    <span className="text-red-500 ml-1">*</span>
                )}
                </label>
            <input
                type={type}
                placeholder={placeholder}
                // onChange={handleChange}
                {...register(name)}
                min={min}
                step={step}
                className={`px-3 h-[44px] w-full border border-gray-300 rounded-xl bg-white text-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}`}
            />
            {error && (
            <p className="text-red-600 text-sm">{(error as any).message}</p>
            )}
        </div>
    );
};

export default PlainInputField;

