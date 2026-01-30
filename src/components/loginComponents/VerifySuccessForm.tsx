import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const VerifySuccessForm = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-2">
            <div className="text-center w-full max-w-sm">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#69C350] flex items-center justify-center">
                    <Check className="text-white w-10 h-10"/>
                </div>

                <h2 className="text-2xl font-semibold mb-8">
                    Verify Successfully
                </h2>
                <p className="text-gray-500 mb-4 md:mb-8 text-sm md:text-base">Your mobile number has been verified successfully</p>
                <button onClick={() => navigate("/setup-profile")}
                    className="w-full bg-[#168Bd9] text-white py-3 rounded-xl font-medium">
                    Set up your profile
                </button>
            </div>
        </div>
    );
};

export default VerifySuccessForm;