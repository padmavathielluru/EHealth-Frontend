import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import { BasicDetails } from "../../../interfaces/basicDetailsTabInterface";
import { basicDetailsTabService } from "../../../services/basicDetailsTabService";
import {
    GENDER_OPTIONS,
    COUNTRY_CODES,
    QUALIFICATION_OPTIONS,
    SPECIALIZATION_OPTIONS,
} from "../../../utils/BasicDetailsConstants";
import PlainInputField from "../../commonComponents/PlainInputField";
import { useForm } from "react-hook-form"
import PhoneNumInputField from "../../commonComponents/PhoneNumInputField";
import GenderInputField from "../../commonComponents/GenderInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, formSchema } from "../../commonComponents/schema";
import * as z from "zod";

const BasicDetailsTab = () => {
    const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
} = useForm<FormSchemaType>({
  resolver: zodResolver(formSchema),
  mode: "onChange",
});

    const [details, setDetails] = useState<BasicDetails | null>(null);

    const [isQualificationOpen, setIsQualificationOpen] = useState(false);
    const [ isSpecializationOpen, setIsSpecializationOpen] = useState(false);

    const [SelectedQualificationOpen, setSelectedQualificationOpen] = useState("");
    const [SelectedSpecializationOpen, setSelectedSpecializationOpen] = useState("");
    
    useEffect(() => {
        const handleClickOutside = () => {
            setIsQualificationOpen(false);
            setIsSpecializationOpen(false);
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        basicDetailsTabService.getBasicDetails().then((data) => {
            setDetails(data);

            setValue("firstName", data.firstName);
            setValue("lastName", data.lastName);

            setSelectedQualificationOpen(data.qualifications);
            setSelectedSpecializationOpen(data.specialization);

        });
    }, []);

    const onSubmit = (data: any) => {
        console.log("From Submitted", data);
    }

    if (!details) return <p>Loading...</p>;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <Title text="Basic Details" />

                    <div className="p-9 mt-4 bg-white border rounded-2xl shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <div className="lg:col-span-2 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <PlainInputField
                                            label="First Name*"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            register={register}
                                            error={errors.firstName}
                                            onlyAlphabets={true}
                                        />
                                    </div>

                                    <div>
                                        <PlainInputField
                                            label="Last Name*"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            register={register}
                                            error={errors.lastName}
                                            onlyAlphabets={true}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <GenderInputField
                                            label="Gender*"
                                            name="gender"
                                            register={register}
                                            error={errors.gender as any}
                                            options={GENDER_OPTIONS}
                                        />

                                    </div>

                                    <div>
                                        <PhoneNumInputField
                                            label="Phone*"
                                            codeName="countryCode"
                                            numberName="phone"
                                            register={register}
                                            errors={{
                                                code: errors.countryCode,
                                                number: errors.phone,
                                            }}
                                            countryCodes={COUNTRY_CODES}
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Address / Location*</label>
                                    <textarea
                                        rows={3}
                                        defaultValue={details.address}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="font-semibold block text-gray-400 mb-2">Qualifications*</label>

                                        <div
                                        tabIndex={0}
                                            className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm cursor-pointer
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${isQualificationOpen ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"}`}
                                            onClick={(e) => {e.stopPropagation();
                                            setIsQualificationOpen(!isQualificationOpen);
                                            setIsSpecializationOpen(false);
                                            }}>
                                            {SelectedQualificationOpen}
                                        </div>

                                        <img
                                            src="/images/fi_chevron-down.svg"
                                            className={`w-5 h-5 absolute right-3 top-11 cursor-pointer transition-transform
                                                        ${isQualificationOpen ? "rotate-180" : "rotate-0"}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            setIsQualificationOpen(!isQualificationOpen);
                                            setIsSpecializationOpen(false);
                                            }}/>

                                        {isQualificationOpen && (
                                            <div className="absolute w-full bg-white border rounded-xl shadow-md mt-1 z-20 "
                                            onClick={(e) => e.stopPropagation()}>
                                                {QUALIFICATION_OPTIONS.map((q) => (
                                                    <div
                                                        key={q}
                                                        className="px-4 py-2 hover:bg-blue-300 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedQualificationOpen(q);
                                                            setValue("qualifications", q);
                                                            setIsQualificationOpen(false);
                                                        }}
                                                    >
                                                        {q}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>


                                    <div className="relative">
                                        <label className="font-semibold block text-gray-400 mb-2">Specialization*</label>

                                        <div
                                        tabIndex={0}
                                            className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm cursor-pointer
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                                ${isSpecializationOpen ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"}`}
                                            onClick={(e) =>{ e.stopPropagation();
                                                 setIsSpecializationOpen(!isSpecializationOpen);
                                                setIsQualificationOpen(false);}}>

                                            {SelectedSpecializationOpen}
                                        </div>
                                        <img
                                            src="/images/fi_chevron-down.svg"
                                            className={`w-5 h-5 absolute right-3 top-11 cursor-pointer transition-transform
                                               ${isSpecializationOpen ? "rotate-180" : "rotate-0"}`}
                                            onClick={(e) => {e.stopPropagation();
                                                 setIsSpecializationOpen(!isSpecializationOpen);
                                                setIsQualificationOpen(false);
                                            }}/>
                                        {isSpecializationOpen && (
                                            <div className="absolute w-full bg-white border rounded-xl shadow-md mt-1 z-20"
                                            onClick={(e) => e.stopPropagation()}>
                                                {SPECIALIZATION_OPTIONS.map((s) => (
                                                    <div
                                                        key={s}
                                                        className="px-4 py-2 hover:bg-blue-300 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedSpecializationOpen(s);
                                                            setValue("specialization", s);
                                                            setIsSpecializationOpen(false);
                                                        }}
                                                    >
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold block text-gray-400 mb-2">Years of Experience*</label>
                                        <input
                                            type="number"
                                            defaultValue={details.yearsOfExperience}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-semibold block text-gray-400 mb-2">Current Hospital/Clinic*</label>
                                        <input
                                            type="text"
                                            defaultValue={details.hospitalAffiliation}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="w-[310px]">
                                    <label className="font-semibold block text-gray-400 mb-2">Languages Spoken*</label>
                                    <input
                                        type="text"
                                        defaultValue={details.languages}
                                        className="w-[320px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                            </div>

                            <div className="flex flex-col items-center pt-4">

                                <div className="relative">
                                    <img
                                        src="/images/Ellipse 1.svg"
                                        alt="profile"
                                        className="w-[150px] h-[150px] rounded-full object-cover border-4 border-white shadow-sm"
                                    />

                                    <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 flex gap-3">
                                        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-100">
                                            <img src="/images/fi_edit-2.svg" className="w-5" />
                                        </button>

                                        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-100">
                                            <img src="/images/u_trash.svg" className="w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-10"></div>
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button className="px-6 py-2 rounded-full h-[40px] w-[96px] bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button className="px-6 py-2 h-[40px] w-[98px] rounded-full bg-blue-500 text-white hover:bg-blue-600">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BasicDetailsTab;
