import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalDetailsSchema } from "../../../schemas/professionalDetailsSchema";
import { useForm, useFieldArray, FormProvider  } from "react-hook-form";
import MedicalQualification from "./MedicalQualification";
import PracriceInfo from "./PracticeInfo";
import { useNavigate } from "react-router-dom";
import { ProfessionalDetailsFormValues } from "../../../interfaces/professionalDetailsInterface";

const ProfessionalDetailsForm: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        setValue,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfessionalDetailsFormValues>({
        resolver: zodResolver(professionalDetailsSchema),
        mode: "onSubmit",
        defaultValues: {
            practices: [
                { practiceType: "", clinicName: "", location: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "practices",
    });

    const onSubmit = (data: ProfessionalDetailsFormValues) => {
        console.log("FORM DATA:", data);
        navigate("/document-verification")
    };

    return (
        <form id="professional-form"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10">
            <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Medical Qualification
            </h2>
            <MedicalQualification 
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
            />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Practice Information
            </h2> 
            <PracriceInfo 
               fields={fields}
                register={register}
                errors={errors}
                addRow={() =>
                    append({ practiceType: "", clinicName: "", location: "" })
                } deleteRow={remove}/>
            </div>
        </div>
        </form>
    );
};

export default ProfessionalDetailsForm;