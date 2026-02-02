import React, { useState } from "react";
import Cost from "../Cost";
import Title from "../../Title";
import { PAYMENT_METHODS_LIST } from "../../../utils/paymentConstants";
import { togglePaymentMethod } from "../../../services/paymentServices";
import { PaymentMethods, ToggleProps } from "../../../interfaces/paymentInterface";

const BillingPaymentSettingsTab: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethods>({
    cash: true,
    upi: true,
    card: false,
    insurance: false,
  });

  const handleToggle = (key: keyof PaymentMethods) => {
    setMethods(togglePaymentMethod(methods, key));
  };

  const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition
        ${checked ? "bg-green-500" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition
          ${checked ? "translate-x-4" : "translate-x-1"}`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-xl h-[460px] overflow-y-auto p-6 shadow-sm space-y-8">
      <Title text="Consultation Fees" />
      {/* {errors.consultationFee && (
                        <p className="text-xs text-red-500 mt-2">
                            {errors.consultationFee}
                        </p>
                    )}
                    <Cost
                        value={consultationFee}
                        onChange={onConsultationFeeChange}
                    /> */}

      <div>
        <Title text="Payment Methods" />
        <div className="border rounded-xl space-y-3 p-8 mt-8 bg-white">
          <div className="pb-4">
            <h2 className="text-base text-gray-500">Accepted Payment Modes</h2>
          </div>

          {PAYMENT_METHODS_LIST.map(({ key, label }) => (
            <div className="flex items-center gap-4" key={key}>
              <Toggle
                checked={methods[key]}
                onChange={() => handleToggle(key)}
              />
              <span className="text-sm text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPaymentSettingsTab;
