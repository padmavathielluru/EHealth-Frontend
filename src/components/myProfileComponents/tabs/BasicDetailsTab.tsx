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

const BasicDetailsTab = () => {
    const [details, setDetails] = useState<BasicDetails | null>(null);

    //   const inputClass = "w-full px-6 py-3 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    useEffect(() => {
        basicDetailsTabService.getBasicDetails().then((data) => {
            setDetails(data);
        });
    }, []);

    if (!details) return <p>Loading...</p>;

    return (
        <div>
            
            <div className="">
                <Title text="Basic Details" />

                <div className="p-9 mt-4 bg-white border rounded-2xl shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">First Name*</label>
                                    <input
                                        type="text"
                                        defaultValue={details.firstName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Last Name*</label>
                                    <input
                                        type="text"
                                        defaultValue={details.lastName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Gender*</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        defaultValue={details.gender}>
                                        {GENDER_OPTIONS.map((g) => (
                                            <option key={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Phone*</label>

                                    <div
                                        className=" flex items-center  border border-gray-300 rounded-xl bg-white 
                                                       px-1 h-[44px] text-sm focus-within:ring-2 focus-within:ring-blue-500" >
                                        <select
                                            defaultValue={details.countryCode}
                                            className="bg-transparent outline-none pr-2"
                                        >
                                            {COUNTRY_CODES.map((c) => (
                                                <option key={c}>{c}</option>
                                            ))}
                                        </select>

                                        <div className="w-[0.2px] bg-gray-300 h-9.5 mx-2 self-stretch"></div>

                                        <input
                                            type="text"
                                            defaultValue={details.phone}
                                            className="flex-1 bg-transparent outline-none"
                                            placeholder="Enter phone"
                                        />
                                    </div>
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
                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Qualifications*</label>
                                    <select
                                        defaultValue={details.qualifications}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {QUALIFICATION_OPTIONS.map((q) => (
                                            <option key={q}>{q}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="font-semibold block text-gray-400 mb-2">Specialization*</label>
                                    <select
                                        defaultValue={details.specialization}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {SPECIALIZATION_OPTIONS.map((s) => (
                                            <option key={s}>{s}</option>
                                        ))}
                                    </select>
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
                            <div>
                                <label className="font-semibold block text-gray-400 mb-2">Languages Spoken*</label>
                                <input
                                    type="text"
                                    defaultValue={details.languages}
                                    className="w-[320px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"

                                />
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
                    <button className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BasicDetailsTab;
