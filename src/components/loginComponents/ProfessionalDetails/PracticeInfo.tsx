import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import PlainInputField from "../../commonComponents/PlainInputField";
import { ProfessionalDetailsFormValues } from "../../../interfaces/professionalDetailsInterface";

interface Props {
    fields: any[];
    register: UseFormRegister<ProfessionalDetailsFormValues>;
    errors: FieldErrors<ProfessionalDetailsFormValues>;
    addRow: () => void;
    deleteRow: (index: number) => void;
}

const PracticeInfo: React.FC<Props> = ({
    fields,
    register,
    errors,
    addRow,
    deleteRow,
}) => {
    return (
        <div className="border rounded-xl p-4">
            {fields.map((_, index) => (
                <div key={index} className="">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                        <PlainInputField
                            label="Practice Type*"
                            name={`practices.${index}.practiceType`}
                            register={register}
                            error={errors?.practices?.[index]?.practiceType}
                        />
                        <PlainInputField
                            label="Clinic/Hospital Name*"
                            name={`practices.${index}.clinicName`}
                            register={register}
                           error={errors?.practices?.[index]?.clinicName}
                        />
                        <PlainInputField
                            label="Location*"
                            name={`practices.${index}.location`}
                            register={register}
                            error={errors?.practices?.[index]?.location}
                        />
                        <div className="flex items-center mt-6 w-[76px] gap-2 ">
                            {index === 0 && (
                                <button
                                type="button"
                                    onClick={addRow}
                                    className="w-10 h-10 border border-blue-400 rounded-lg flex  items-center justify-center hover:bg-blue-100 cursor-pointer select-none focus:outline-none">
                                    <img src="/images/u_plus(1).svg" alt="plus" className="w-5 h-5 pointer-events-none " />
                                </button>
                            )}
                            {index > 0 && (
                                <button
                                type="button"
                                    onClick={() => deleteRow(index)}
                                    className="w-10 h-10 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer select-none focus:outline-none">
                                    <img src="/images/u_trash.svg" alt="delete" className="w-4 h-4 pointer-events-none " />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PracticeInfo;