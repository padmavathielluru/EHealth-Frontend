import React from "react";

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const TermsAndCaptcha: React.FC<Props> = ({ checked, onChange }) => {
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

            <div className="border w-full max-w-[274px] h-[67px] rounded-md p-3 flex items-center justify-between bg-gray-50">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox"
                            checked={checked}
                            onChange={(e) => onChange(e.target.checked)}
                            className="w-4 h-4 accent-[#34A853] ml-4"/>
                    <span className="text-sm text-gray-600">I'm not a robot</span>
                </label>
                <img src="images/google_recaptcha-official 2.svg" alt="reCAPTCHA" className="w-9 h-9"/>
            </div>
        </div>
    );
};

export default TermsAndCaptcha;