import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "../../Title";
import PasswordInputField from "../../commonComponents/PasswordInputField";
import { resetPasswordSchema, ResetPasswordFormType,} from "../../commonComponents/schema";

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
    <div className="bg-white rounded-xl p-6">
        <Title text="Reset Password"/>
        <div className="rounded-xl border border-gray-100 mt-6 p-6 ">
            <div className="w-[355px] mb-6 mt-2">
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
         <div className="flex pt-4 gap-2 justify-end">
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
