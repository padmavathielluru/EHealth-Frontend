import React from "react";
import MedvedaLogin from "../components/loginComponents/MLogin/MedvedaLogin";
import LoginForm from "../components/loginComponents/MLogin/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row select-none">
      <div className="hidden md:flex w-1/2">
        <MedvedaLogin />
      </div>
    <div className="w-full md:w-1/2 flex items-center justify-center">
     <LoginForm />
     </div>
    </div>
  );
};

export default Login;
