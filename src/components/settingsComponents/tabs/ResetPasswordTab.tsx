import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "../../Title";
import PasswordInputField from "../../commonComponents/PasswordInputField";
import { resetPasswordSchema, ResetPasswordFormType,} from "../../../schemas/schema";

const ResetPasswordTab: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ResetPasswordFormType) => {
    console.log("Reset Password Data:", data);
  };

  return (
    <div className="bg-white flex flex-col rounded-xl h-[460px]" >
      <div className="flex-1 p-6 space-y-8">
        <Title text="Reset Password"/>
        <div className="rounded-xl border border-gray-100 flex-1 h-[290px] overflow-y-auto p-6 ">
            <div className="w-[355px] mt-2">
              <form onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4">
                  <PasswordInputField 
                        label="Current Password"
                        name="currentPassword"
                        register={register}
                        error={errors.currentPassword}
                        showStrength={false}/>
                  <PasswordInputField
                        label="New Password"
                        name="newPassword"
                        register={register}
                        error={errors.newPassword}
                        showStrength={false}/>
                  <PasswordInputField
                        label="Confirm New Password"
                        name="confirmPassword"
                        register={register}
                        error={errors.confirmPassword}
                        showStrength/>
              </form>
            </div>
        </div>
        </div>
         <div className="flex pt-4 gap-2 border-t sticky bottom-0 justify-end pb-4">
                <button type="button" className="bg-gray-100 text-gray-500 border border-gray-200 px-6 py-2 rounded-xl text-sm hover:bg-gray-200 transition">
                      Cancle
                </button>
                <button type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-600 transition">
                      Update
                </button>
            </div>
    </div>
  );
};

export default ResetPasswordTab;
