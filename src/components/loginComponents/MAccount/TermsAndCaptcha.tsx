import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
    onVerify: (token: string | null) => void;

}

const TermsAndCaptcha: React.FC<Props> = ({ onVerify }) => {
    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-500 leading-relaxed">
                By creating an account, you agree to our{" "}
                <p>
                    <span className="text-[#168BD9] cursor-pointer hover:underline">
                        Terms of use</span>{" "}
                    and{" "}
                    <span className="text-[#168BD9] curcor-pointer hover:underline">
                        Privacy Policy</span></p>
            </p>
            <ReCAPTCHA
                sitekey="6Lfx61ssAAAAAH_CZ7PziBsEianF4_kFMT47J_ol"
                onChange={onVerify}
            />

        </div>
    );
};

export default TermsAndCaptcha;