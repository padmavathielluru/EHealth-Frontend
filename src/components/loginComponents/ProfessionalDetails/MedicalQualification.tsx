import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch ,UseFormSetValue} from "react-hook-form";
import DropdownInputFields from "../../commonComponents/DropdownInputFields";
import PlainInputField from "../../commonComponents/PlainInputField";
import { DEGREE_OPTIONS, SPECIALIZATION_OPTIONS, MEDICAL_COUNCIL_OPTIONS } from "../../../utils/DropdownInputFieldsConstants";

interface Props {
    register: UseFormRegister<any>;
     setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
    errors: FieldErrors<any>;
}

const MedicalQualification: React.FC<Props> = ({
    register,
    errors,
    setValue,
    watch,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <DropdownInputFields 
                label="Primary Degree"
                name="degree"
                options={DEGREE_OPTIONS}
                // register={register}
                setValue={setValue}
                watch={watch}
                error={errors.degree}
            />

             <DropdownInputFields 
                label="Specialization(s)*"
                name="specialization"
                options={SPECIALIZATION_OPTIONS}
                // register={register}
                 setValue={setValue}
                watch={watch}
                error={errors.specialization}
            />

            <PlainInputField 
                label="Years of Experience*"
                name="experience"
                type="number"
                placeholder="Eg: 5"
                register={register}
                error={errors.experience}
                min={0}
                step={1}
            />
            
            <DropdownInputFields 
                label="Medical Council Name*"
                name="council"
                options={MEDICAL_COUNCIL_OPTIONS}
                // register={register}
                 setValue={setValue}
                watch={watch}
                error={errors.council}
            />

            <PlainInputField 
                label="License Number*"
                name="license"
                register={register}
                error={errors.license}
            />
        </div>
    );
};

export default MedicalQualification;