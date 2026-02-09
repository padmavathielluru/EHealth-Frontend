import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  ACCOUNT_STATUS_LABEL,
  ACCOUNT_STATUS_STYLE,
} from "../../utils/SubmitStatusConstant";

const ProfileSubmittedSuccessView: React.FC = () => {
  const navigate = useNavigate();

  const status = useSelector(
    (state: RootState) => state.submit.accountStatus
  );

  return (
    <div className="relative min-h-screen bg-[#FBFBFD] overflow-hidden select-none">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 scale-125">
        <Title text="Medveda" />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[55%] bg-no-repeat bg-bottom bg-cover"
        style={{ backgroundImage: "url('/images/City.svg')" }}/>

      <div className="absolute inset-0 flex justify-center items-start pt-[140px] pointer-events-none">
        <div className="relative w-[800px] h-[280px]">
          <img
            src="/images/Group 1000008344.svg"
            className="absolute inset-0 w-full h-full object-contain z-0"
            alt="outline" />
          <img
            src="/images/Group 1000008343.svg"
            className="absolute inset-0 w-full h-full object-contain z-10 translate-x-[18px] -translate-y-[12px] grayscale"
            alt="photo"/>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center mt-[420px] px-4">
        <h2 className="text-[24px] font-semibold text-gray-900">
          Profile Submitted Successfully!
        </h2>

        <p className="text-sm text-gray-500 mt-4 max-w-xl leading-relaxed">
          Thank you for completing your professional profile.
          We have received your credentials and our medical board
          is currently conducting a standard verification check.
        </p>

        <p className="text-sm mt-3 font-medium">
          <span className="text-gray-900">Account Status:</span>{" "}
          <span className={ACCOUNT_STATUS_STYLE[status]}>
            {ACCOUNT_STATUS_LABEL[status]}
          </span>
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 px-10 py-3 bg-[#168BD9] text-white rounded-xl font-medium hover:bg-[#0f76bd] transition">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ProfileSubmittedSuccessView;
