import React, { useState } from "react";
import Title from "../components/Title";
import YearCalendar from "../components/commonComponents/YearCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PlainInputField from "../components/commonComponents/PlainInputField";
import DropdownInputField from "../components/commonComponents/DropdownInputFields";
import { DEGREE_OPTIONS, SPECIALIZATION_OPTIONS } from "../utils/DropdownInputFieldsConstants";
import { StudyFormType, studySchema } from "../schemas/StudyModalSchema";

interface AddNewStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewStudyModal: React.FC<AddNewStudyModalProps> = ({
    isOpen,
    onClose }) => {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<StudyFormType>({
        resolver: zodResolver(studySchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            degree: "",
            institution: "",
            specialization: "",
            year: "",
        },
    });

    const onSubmit = (data: StudyFormType) => {
        console.log("Study Data", data);
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[704px] max-h-[80vh] rounded-2xl shadow-xl p-8 relative overflow-y-auto">

                <div className="flex items-center justify-between mb-4">
                    <Title text="Add New Study" />
                    <button onClick={onClose}
                        className=" w-8 h-8 flex items-center justify-center">
                        <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="mb-5">
                        <PlainInputField
                            label="Degree / Certification*"
                            name="degree"
                            placeholder="e.g. B.Tech, MBA, Diploma"
                            register={register}
                            error={errors.degree}
                        />
                    </div>

                    <div className="flex gap-4 mb-5">

                        <div className="flex-1">
                            <PlainInputField
                                label="Institution Name*"
                                name="institution"
                                placeholder="Institution"
                                register={register}
                                error={errors.institution}
                            />
                        </div>

                        <div className="w-[40%]">
                            <YearCalendar
                                label="Year"
                                value={watch("year") ?? ""}
                                onChange={(val) => setValue("year", val, { shouldValidate: true })}
                                errorMessage={errors.year?.message}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <DropdownInputField
                            label="Specialization*"
                            name="specialization"
                            options={SPECIALIZATION_OPTIONS}
                            setValue={setValue}
                            watch={watch}
                            error={errors.specialization}
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button"
                            onClick={onClose}
                            className="w-[96px] h-[40px] rounded-xl border text-gray-500 hover:bg-gray-100 transition">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            // onClick={onClose}
                            className="w-[76px] h-[40px] rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow">
                            Add
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddNewStudyModal;
