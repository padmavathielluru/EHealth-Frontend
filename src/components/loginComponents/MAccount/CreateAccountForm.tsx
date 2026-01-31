import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "../../../schemas/schema";
import SocialLogin from "../SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import PlainInputField from "../../commonComponents/PlainInputField";
import PasswordInputField from "../../commonComponents/PasswordInputField";
import EmailInputField from "../../commonComponents/EmailInputField";
import TermsAndCaptcha from "./TermsAndCaptcha";

type CreateAccountFormValues = {
    username: string;
    email: string;
    password: string;
};

const CreateAccountForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAccountFormValues>({
        resolver: zodResolver(createAccountSchema),
        mode: "onSubmit"
    });

    const navigate = useNavigate();

    const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

    const onSubmit = (data: CreateAccountFormValues) => {
        if (!captchaToken) return;

        const payload = { ...data, captchaToken, };

        console.log("signup data:", payload);

        navigate("/verify-mobile");
    };

    return (
        <div className="w-full bg-white flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md px-4 sm:px-6 py-6">

                <h2 className="mt-4 text-2xl font-semibold">Create account{" "}
                    <span className="text-gray-400 text-base">as a Doctor</span>
                </h2>
                <div className="mt-6 space-y-4">
                    <PlainInputField
                        label="User name"
                        name="username"
                        placeholder="Enter Username"
                        register={register}
                        error={errors.username}
                        onlyAlphabets={true}
                    />

                    <EmailInputField
                        label="Email"
                        name="email"
                        placeholder="Enter Email Address"
                        register={register}
                        error={errors.email}
                    />

                    <div className="">
                        <PasswordInputField
                            label="Password"
                            name="password"
                            placeholder="Enter Passowrd"
                            register={register}
                            error={errors.password}
                        />
                        <div className="text-rigth text-sm text-gray-300 curcor-pointer">
                            Use 8 or more characters with a mix of letters, numbers & symbols
                        </div>
                    </div>

                    <TermsAndCaptcha onVerify={setCaptchaToken} />

                    <div className="">
                        <button
                            disabled={!captchaToken}
                            className={`w-full py-2 rounded-xl transition ${captchaToken ? "bg-[#168BD9] text-white"
                                    : "bg-gray-300 text-gray-500 curcor-not-allowed"}`}>
                            Create an account
                        </button>
                        <p className="text-rigth text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login"
                                className="text-[#168BD9] cursor-pointer font-medium">Log in</Link>
                        </p>
                    </div>
                    <SocialLogin />
                </div>
            </form>
        </div>
    );
};

export default CreateAccountForm;