import React from "react";
import { UseFormRegister, FieldErrors, FieldValues,
    UseFormSetValue, UseFormWatch
 } from "react-hook-form";
import PlainInputField from "../../commonComponents/PlainInputField";
import DropdownInputField from "../../commonComponents/DropdownInputFields";
import { COUNTRY_OPTIONS, STATE_OPTIONS, } from "../../../utils/DropdownInputFieldsConstants";

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
}

const AddressInfo = <T extends FieldValues>({
    register,
    errors,
    setValue,
    watch,
}: Props<T>) => {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">
                Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PlainInputField
                    label="Address 1*"
                    name="address1"
                    placeholder="Address 1*"
                    register={register}
                    error={errors.address1}/>

                <PlainInputField
                    label="Address 2"
                    name="address2"
                    placeholder="Address 2"
                    register={register}
                    error={errors.address2}/>

                <PlainInputField
                    label="City*"
                    name="city"
                    placeholder="City"
                    register={register}
                    error={errors.city}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DropdownInputField
                    label="Country*"
                    name="country"
                    // register={register}
                    options={COUNTRY_OPTIONS}
                    setValue={setValue}
                     watch={watch}
                    error={errors.country as any}/>

                <DropdownInputField
                    label="State*"
                    name="state"
                    // register={register}
                     setValue={setValue}
                     watch={watch}
                    options={STATE_OPTIONS}
                    error={errors.state as any}/>

                <PlainInputField
                    label="PIN Code*"
                    name="pincode"
                    placeholder="PIN Code"
                    register={register}
                    error={errors.pincode}/>
            </div>
        </div>
    );
};

export default AddressInfo;
