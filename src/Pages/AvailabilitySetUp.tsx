import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AvailabilitySetUpForm from "../components/loginComponents/AvailabilitySetUp/AvailabilitySetUpForm";
import ProfileStepper from "../components/loginComponents/ProfileStepper";
import { validateAvailabilityPage, AvailabilityErrors, } from "../schemas/AvailabilityPageSchema";
import { AvailabilityRow } from "../components/loginComponents/AvailabilitySetUp/AvailabilityTable";

const AvailabilitySetUp: React.FC = () => {
    const navigate = useNavigate();

    const [availability, setAvailability] = useState<AvailabilityRow[]>([]);
const [consultationSlot, setConsultationSlot] = useState<{
  slotDuration: number;
  buffer: number;
} | null>(null);
const [consultationFee, setConsultationFee] = useState<number | null>(null);
const [errors, setErrors] = useState<AvailabilityErrors>({});

    const handleSubmit = () => {
        const validationErrors = validateAvailabilityPage({
            availability,
            consultationSlot,
            consultationFee,
        });
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length > 0){
            return;
        } 
               navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
            <div className="w-full max-w-7xl p-6 md:p-10">
                <ProfileStepper currentStep={4} />
                <div className="text-center mb-8 select-none">
                    <Title text="Availability & Fees SetUp" />
                </div>
                <div className="">
                    <AvailabilitySetUpForm
                        availability={availability}
                        onAvailabilitychange={setAvailability}
                        consultationSlot={consultationSlot}
                        onConsultationSlotChange={setConsultationSlot}
                        consultationFee={consultationFee}
                        onConsultationFeeChange={setConsultationFee}
                        errors={errors}
                    />
                </div>
                <div className="flex justify-center gap-4 mt-12">
                    <button onClick={() => navigate("/document-verification")}
                        className="flex items-center justify-center gap-2 w-[124px] h-[49px]
                        border border-gray-300 rounded-xl text-gray-400 hover:bg-gray-100 transition">
                        <img src="/images/Arrow left.svg" alt="arrow" className="w-4 h-4" />
                        Back
                    </button>
                    <button onClick={handleSubmit}
                        className="w-[211px] h-[49px] bg-[#168BD9] text-white rounded-xl font-medium hover:bg-[#0f76bd] transition">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AvailabilitySetUp;