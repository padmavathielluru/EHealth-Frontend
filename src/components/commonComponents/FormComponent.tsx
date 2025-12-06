import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "./schema";
import PlainInputField from "./PlainInputField";
import NumberInputField from "./NumberInputField";
import EmailInputField from "./EmailInputField";
import PasswordInputField from "./PasswordInputField";
import TimeInputField from "./TimeInputField";

const FormComponent = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log("Form Submitted:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 w-full max-w-md"
        >
            <PlainInputField
                label="Full Name"
                name="plain"
                register={register}
                error={errors.plain}
            />

            <NumberInputField
                label="Phone Number"
                name="number"
                register={register}
                error={errors.number}
            />

            <EmailInputField
                label="Email"
                name="email"
                register={register}
                error={errors.email}
            />

            <PasswordInputField
                label="Password"
                name="password"
                register={register}
                error={errors.password}
            />

            <h2 className="text-gray-600 text-sm font-semibold mt-4">Working hours</h2>
            <div className="flex items-center gap-5">
                <TimeInputField
                label="From"
                name="fromTime"
                meridiemName="fromMeridiem"
                register={register}
                setValue={setValue}
                value={watch("fromTime") || ""}
                meridiem={watch("fromMeridiem") || "AM"}
                error={errors.fromTime}
                />
                
                <img src="/images/Vector.svg" alt="arrow" className="w-10 h-10 text-gray-900 pt-5 opacity-60" />

                <TimeInputField
                label="To"
                name="toTime"
                meridiemName="toMeridiem"
                register={register}
                setValue={setValue}
                value={watch("toTime") || ""}
                meridiem={watch("toMeridiem") || "PM"}
                error={errors.toTime}
                />
            </div>
            
            <button
                // type="submit"
                // className="bg-blue-600 text-white p-2 rounded"
            >
                {/* Submit */}
            </button>
        </form>
    );
};

export default FormComponent;
