import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
}

const PlainInputField = ({ label, name, placeholder, register, error }: Props) => {
    return (
        <div className="flex flex-col">
            <label className="font-medium">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                {...register(name)}
                className="border p-2 rounded"
            />
            {error && <p className="text-red-600 text-sm">{error.message}</p>}
        </div>
    );
};

export default PlainInputField;
