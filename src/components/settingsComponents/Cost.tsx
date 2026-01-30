import React from "react";
import CurrencyInput from "./CurrencyInput";
import { fees, currencies } from "../../utils/CostConstants";

const Cost: React.FC = () => {
  return (
    <div className="">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mt-6">
        <div className="space-y-4">
          {fees.map((fee) => (
            <CurrencyInput key={fee} label={fee} currencies={currencies} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cost;
