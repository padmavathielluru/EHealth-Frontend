import React from "react";
import CreateAccountForm from "../components/loginComponents/MAccount/CreateAccountForm";
import MedvedaAccount from "../components/loginComponents/MAccount/MedvedaAccount";

const CreateAccount = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row select-none">
      <div className="hidden md:flex w-1/2">
        <MedvedaAccount />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default CreateAccount;
