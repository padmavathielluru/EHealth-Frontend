import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CurrencyInput from "./CurrencyInput";
import { fees, currencies } from "../../utils/CostConstants";
import { costSchema, CostFormType } from "../../schemas/schema";

const Cost: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<CostFormType>({
    resolver: zodResolver(costSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:border md:border-gray-300 md:rounded-xl overflow-hidden">
        <div className="bg-white border rounded-xl p-4 space-y-4 border-gray-300
                      md:border-0 md:rounded-none md:p-6 md:border-r">
          <h3 className="text-center border-b rounded-t-xl md:rounded-none font-semibold text-gray-700 bg-gray-100 p-4 -m-4 mb-4 md:-m-6 md:mb-6">
            IN-CLINIC
          </h3>

          {fees.map((fee) => (
            <div key={fee.key}>
              <div className="text-sm text-gray-500 mb-2">
                {fee.label}
              </div>
              <CurrencyInput
                label=""
                fieldName={`inClinic.${fee.key}`}
                currencies={currencies}
                register={register}
                error={errors.inClinic?.[fee.key]?.message}
              />
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-4
                  md:border-0 md:rounded-none md:p-6 md:border-r">
          <h3 className="text-center border-b rounded-t-xl  md:rounded-none  font-semibold text-gray-700 bg-gray-100 p-4 -m-4 mb-4 md:-m-6 md:mb-6">
            VIDEO
          </h3>

          {fees.map((fee) => (
            <div key={fee.key}>
              <div className="text-sm text-gray-500 mb-2">
                {fee.label}
              </div>
              <CurrencyInput
                label=""
                fieldName={`video.${fee.key}`}
                currencies={currencies}
                register={register}
                error={errors.video?.[fee.key]?.message}
              />
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-4
                    md:border-0 md:rounded-none md:p-6">
          <h3 className="text-center border-b font-semibold rounded-t-xl  md:rounded-none text-gray-700 bg-gray-100 p-4 -m-4 mb-4 md:-m-6 md:mb-6">
            HOME VISIT
          </h3>

          {fees.map((fee) => (
            <div key={fee.key}>
              <div className="text-sm text-gray-500 mb-2">
                {fee.label}
              </div>
              <CurrencyInput
                label=""
                fieldName={`homeVisit.${fee.key}`}
                currencies={currencies}
                register={register}
                error={errors.homeVisit?.[fee.key]?.message}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Cost;

