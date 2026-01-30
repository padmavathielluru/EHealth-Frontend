import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface Props {
  currentStep: number;
}

const steps: Step[] = [
  { id: 1, label: "Basic Profile Setup" },
  { id: 2, label: "Professional Details" },
  { id: 3, label: "Document Verification" },
  { id: 4, label: "Availability & Fees Setup" },
];

const ProfileStepper: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="w-full mb-10 select-none">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 items-start relative">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
               {index !== steps.length - 1 && (
                <>
                  <div
                    className={`hidden md:block absolute top-3 left-1/2 w-full h-[2px]
                      ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                  />
                  <div
                    className={`md:hidden absolute left-3 top-6 w-[2px] h-full
                      ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                  />
                </>
              )}
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center z-10
                  ${ isCompleted ? "bg-green-500" : isActive  ? "border-2 border-blue-500 bg-white"  : "bg-gray-300"  } `} >
                {isCompleted && (
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                )}
                {isActive && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
              <p
                className={`
                  mt-2 text-sm md:mt-2 text-left md:text-center leading-snug whitespace-nowrap
                  ${ isCompleted  ? "text-green-600"  : isActive  ? "text-blue-600 font-medium"  : "text-gray-400" } `} >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileStepper;
