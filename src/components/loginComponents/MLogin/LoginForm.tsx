import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/schema";
import SocialLogin from "../SocialLogin";
import { Link } from "react-router-dom";
import PlainInputField from "../../commonComponents/PlainInputField";
import PasswordInputField from "../../commonComponents/PasswordInputField";

type LoginFormValues = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit"
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("login data:", data);
    }

    return (
        <div className="w-full bg-white flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md px-4 sm:px-6 py-6">
                <h2 className="mt-4 text-2xl font-semibold">Login to Medveda{" "}
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

                    <div className="">
                        <PasswordInputField
                            label="Password"
                            name="password"
                            placeholder="Enter Password"
                            register={register}
                            error={errors.password}
                        />
                        <div className="text-rigth text-sm text-[#168BD9] curcor-pointer">
                            Forget password?
                        </div>
                    </div>
                    <div className="">
                        <button className="w-full bg-[#168BD9] text-white py-2 rounded-xl">
                            Log in
                        </button>
                        <p className="text-rigth text-sm text-gray-500">
                            Dont't have an account?{" "}
                            <Link to="/create-account"
                            className="text-[#168BD9] cursor-pointer">Create</Link>
                        </p>
                    </div>
                    <SocialLogin />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;