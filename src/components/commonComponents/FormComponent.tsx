import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "../../schemas/schema";
import PlainInputField from "./PlainInputField";
import PhoneNumInputField from "./PhoneNumInputField";
import EmailInputField from "./EmailInputField";
import PasswordInputField from "./PasswordInputField";
import { COUNTRY_CODES, GENDER_OPTIONS } from "../../utils/BasicDetailsConstants";
import GenderInputField from "./GenderInputField";
import YearCalendar from "./YearCalendar";
// import WorkingHours from "../settingsComponents/WorkingHours";
import DateYearCalendar from "./DateYearCalendar";

const FormComponent = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            year: "",
        }
    });
    const yearValue = watch("year") ?? "";
    const startDateValue = watch("startDate") ?? "";

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
                name="firstName"
                placeholder="Enter first Name"
                register={register}
                error={errors.firstName}
                onlyAlphabets={true}
            />


            <PhoneNumInputField
                label="Phone*"
                codeName="countryCode"
                numberName="phone"
                setValue={setValue}
                watch={watch}
                // register={register}
                errors={{
                    code: errors.countryCode,
                    number: errors.phone,
                }}
                countryCodes={COUNTRY_CODES}
            />

            <GenderInputField
                label="Gender"
                name="gender"
                // register={register}
                setValue={setValue}
                watch={watch}
                error={errors.gender as any}
                options={GENDER_OPTIONS}
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

            {/* <div className="mt-6">
                <WorkingHours
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    trigger={trigger} />
            </div> */}

            <div className="mt-8">
                <YearCalendar
                    label="YearCalender"
                    value={yearValue}
                    onChange={(val: string) => setValue("year", val, { shouldValidate: true })}
                    errorMessage={errors.year?.message}
                />
            </div>

            <div className="mt-8">
                <label className="text-sm text-gray-400 mb-1 block">
                    Start Date
                </label>

                <DateYearCalendar
                    value={startDateValue}
                    placeholder="DD/MM/YYYY"
                    hasError={!!errors.startDate}
                    onChange={(formatted) =>
                        setValue("startDate", formatted, {
                            shouldValidate: true,
                        })
                    }
                />

                {errors.startDate && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.startDate.message}
                    </p>
                )}
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
