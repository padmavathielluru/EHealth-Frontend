import React from "react";
import Title from "../../Title";

const points = [
    "Welcome to Medveda Account",
    "Welcome to Medveda Account",
    "Welcome to Medveda Account",
    "Welcome to Medveda Account", 
]

const MedvedaAccount = () => {
  return (
    <div className="w-full h-full flex bg-gray-100 items-center justify-center px-6">
      <div className="flex flex-col items-center text-center space-y-8">
        <img
          src="/images/Doctor.svg"
          alt="login"
          className="w-35 h-35"/>
        <Title text="Medveda"/>

        <div className="space-y-2">
            {points.map((text, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{text}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MedvedaAccount;
