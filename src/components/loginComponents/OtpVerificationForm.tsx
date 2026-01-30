import React, { useRef, useState } from "react";
import Title from "../Title";
import { useNavigate } from "react-router-dom";

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (error) setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setError("Please enter a 6-digit OTP");

      const firstEmptyIndex = otp.findIndex((d) => d === "");
      if (firstEmptyIndex !== -1) inputsRef.current[firstEmptyIndex]?.focus();
      return;
    };
    setError("");
      navigate("/verify-success");
  };

  return (
    <div className="p-6 w-full max-w-md text-center">
      <Title text="OTP Verification" />
      <label className="text-gray-500 block mt-4 mb-2 text-left">Enter OTP</label>

      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-[60px] h-[44px] border border-gray-300 rounded-lg text-center text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleVerify}
        className="w-full bg-[#168BD9] text-white py-2 rounded-xl">
        Verify
      </button>
    </div>
  );
};

export default OtpVerificationForm;
