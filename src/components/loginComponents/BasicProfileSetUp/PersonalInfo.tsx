import React from "react";
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import PlainInputField from "../../commonComponents/PlainInputField";
import EmailInputField from "../../commonComponents/EmailInputField";
import GenderInputField from "../../commonComponents/GenderInputField";
import { GENDER_OPTIONS } from "../../../utils/BasicDetailsConstants";
import DateYearCalendar from "../../commonComponents/DateYearCalendar";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  dateOfBirth: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  onDateChange: (value: string) => void;
}

const PersonalInfo = <T extends FieldValues> ({
    register,
    errors,
    setValue,
    watch,
    dateOfBirth,
    onDateChange, }: Props<T>) => {
    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
                Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <PlainInputField
                    label="First Name*"
                    name="firstName"
                    placeholder="Enter first name"
                    register={register}
                    error={errors.firstName}
                    onlyAlphabets />

                <PlainInputField
                    label="Middle Name"
                    name="middleName"
                    placeholder="Enter middle name"
                    register={register}
                    error={errors.middleName}
                    onlyAlphabets />

                <PlainInputField
                    label="Last Name*"
                    name="lastName"
                    placeholder="Enter last name"
                    register={register}
                    error={errors.lastName}
                    onlyAlphabets />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EmailInputField
                    label="Email*"
                    name="email"
                    placeholder="Enter Email Address"
                    register={register}
                    error={errors.email}
                />
                <GenderInputField
                    label="Gender*"
                    name="gender"
                    // register={register}
                     setValue={setValue}
                watch={watch}
                    error={errors.gender as any}
                    options={GENDER_OPTIONS}
                />
                <div className="">
                    <label className="text-sm text-gray-400 mb-1 block">
                        Date of Birth{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <DateYearCalendar
                        value={dateOfBirth}
                        placeholder="DD/MM/YYYY"
                        hasError={!!errors.startDate}
                        onChange={onDateChange}
                        // onChange={(val) => setValue("startDate" as any, val, { shouldValidate: true })}
                    />

                    {errors.startDate && (
                        <p className="text-xs text-red-500 mt-1">
                            {String(errors.startDate.message)}
                        </p>
                    )}
                </div>

            </div>
        </div>

    );
};

export default PersonalInfo;
