import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AvailabilitySetUpForm from "../components/loginComponents/AvailabilitySetUp/AvailabilitySetUpForm";
import ProfileStepper from "../components/loginComponents/ProfileStepper";

const AvailabilitySetUp: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
            <div className="w-full max-w-7xl p-6 md:p-10">
                <ProfileStepper currentStep={4} />
                <div className="text-center mb-8 select-none">
                    <Title text="Availability & Fees SetUp" />
                </div>
                <div className="">
                <AvailabilitySetUpForm />
                </div>
                <div className="flex justify-center gap-4 mt-12">
                    <button onClick={() => navigate("/document-verification")}
                        className="flex items-center justify-center gap-2 w-[124px] h-[49px]
                        border border-gray-300 rounded-xl text-gray-400 hover:bg-gray-100 transition">
                    <img src="/images/Arrow left.svg" alt="arrow" className="w-4 h-4"/>
                    Back
                    </button>
                    <button onClick={() => navigate("")}
                        className="w-[211px] h-[49px] bg-[#168BD9] text-white rounded-xl font-medium hover:bg-[#0f76bd] transition">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AvailabilitySetUp;