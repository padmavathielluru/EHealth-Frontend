import React from "react";
import { UseFormRegister, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    onlyAlphabets?: boolean;
}

const PlainInputField = ({ label, name, placeholder, register, error, onlyAlphabets, }: Props) => {
    const { onChange, ...rest} = register(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <div className="flex flex-col">
            <label className="font-semibold block text-gray-400 mb-2">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                {...rest}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
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

