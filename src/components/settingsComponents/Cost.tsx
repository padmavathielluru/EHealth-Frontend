import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "./CurrencyInput";
import { fees, currencies } from "../../utils/CostConstants";
import { costSchema, CostFormType} from "../../components/commonComponents/schema";

const Cost: React.FC = () => {
  const { register,
    formState: { errors },
  } = useForm<CostFormType>({
    resolver: zodResolver(costSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  });

  return (
    <div className="">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mt-6">
        <div className="space-y-4">
          {fees.map((fee) => (
            <CurrencyInput 
            key={fee.key} 
            label={fee.label}
            fieldName={fee.key} 
            currencies={currencies}
            register={register}
            error={errors[fee.key]?.message as string} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cost;
