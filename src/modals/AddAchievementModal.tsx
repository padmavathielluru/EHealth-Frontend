import React from "react";
import Title from "../components/Title";
import YearCalendar from "../components/commonComponents/YearCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchievementModalSchema, AchievementModalFormType } from "../schemas/AchievementModalSchema";
import PlainInputField from "../components/commonComponents/PlainInputField";

interface AddAchievementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddAchievementModal: React.FC<AddAchievementModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<AchievementModalFormType>({
        resolver: zodResolver(AchievementModalSchema),
        defaultValues: {
            title: "",
            year: "",
            description: "",
        },
    });

    const onSubmit = (data: AchievementModalFormType) => {
        console.log("Achievement Data:", data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[704px] h-[415px] rounded-2xl shadow-xl p-8 relative ">
                <div className="flex items-center justify-between mb-4">
                    <Title text="Add Achievement" />
                    <button onClick={onClose}
                        className=" w-8 h-8 flex items-center justify-center">
                        <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex gap-10 mb-4">

                    <div className="w-[60%]">
                        <PlainInputField
                            label="Achievement Title*"
                            name="title"
                            placeholder="Journal"
                            register={register}
                            error={errors.title}
                        />

                    </div>

                    <div className="w-[40%]">
                        <YearCalendar
                            label="Year/Period"
                            value={watch("year")}
                            onChange={(val) => setValue("year", val, { shouldValidate: true })}
                            errorMessage={errors.year?.message}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="text-sm text-gray-500 font-semibold">Description</label>
                    <textarea
                        placeholder="Description"
                        {...register("description")}
                        className={`w-full mt-1 p-3 border rounded-xl h-28 focus:outline-none
                            ${errors.description ? "border-red-500" : "border-gray-300"}`}
                    >
                        {errors.description && (
                            <p className="text-red-600 text-sm">
                                {errors.description.message}</p>
                        )}
                    </textarea>
                </div>


                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-600 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button onClick={handleSubmit(onSubmit)}
                        className="px-6 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAchievementModal;
