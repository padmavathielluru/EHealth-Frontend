import React from "react";
import Title from "../../Title";

const MedvedaLogin = () => {
  return (
    <div className="w-full h-full flex bg-gray-100 items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-8 cursor-pointer select-none focus:outline-none">
        <img
          src="/images/Login.svg"
          alt="login"
          className="hidden w-40 lg:w-64 md:block h-auto pointer-evente-none"/>
        <Title
          text="Medveda"
          subtitle="Lorem ipsum dolor sit amet"/>
      </div>
    </div>
  );
};

export default MedvedaLogin;
