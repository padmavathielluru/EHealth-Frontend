import React from "react";
import Title from "../../Title";
import AvailabilityTable from "./AvailabilityTable";
import Cost from "../../settingsComponents/Cost";
import ConsultationTimeSlot from "./ConsultationTimeSlot";
import { CostFormType } from "../../../schemas/schema";

interface Props {
    availability: any[];
    onAvailabilitychange: (data: any[]) => void;
    consultationSlot: any;
    onConsultationSlotChange: (data: any) => void;
    consultationFee: CostFormType | null;
    onConsultationFeeChange: (fee: CostFormType | null) => void;

    errors: {
        availability?: string;
        consultationSlot?: string;
        consultationFee?: string;
    };
    availabilityRef: React.RefObject<HTMLDivElement>;
    availabilityErrorRef: React.RefObject<HTMLParagraphElement>;
    slotRef: React.RefObject<HTMLDivElement>;
    feeRef: React.RefObject<HTMLDivElement>;
}

const AvailabilitySetUpForm: React.FC<Props> = ({
    availability,
    onAvailabilitychange,
    consultationSlot,
    onConsultationSlotChange,
    consultationFee,
    onConsultationFeeChange,
    errors,
    availabilityRef,
    availabilityErrorRef,
    slotRef,
    feeRef,
}) => {
    return (
        <>
            <div ref={availabilityRef} className="">
                <AvailabilityTable
                    value={availability}
                    onChange={onAvailabilitychange}
                    error={errors.availability}
                    errorRef={availabilityErrorRef} />

                <div ref={slotRef} className="mt-6 select-none">
                    <Title text="Setup Consultation Time Slot" />
                    {errors.consultationSlot && (
                        <p className="text-xs text-red-500 mt-2">
                            {errors.consultationSlot}</p>
                    )}

                    <ConsultationTimeSlot
                        value={consultationSlot}
                        onChange={onConsultationSlotChange} />
                </div>

                <div ref={feeRef} className="mt-6 select-none">
                    <Title text="Enter Consultation Fees" />
                    {errors.consultationFee && (
                        <p className="text-xs text-red-500 mt-2">
                            {errors.consultationFee}
                        </p>
                    )}
                    <Cost
                        value={consultationFee}
                        onChange={onConsultationFeeChange}
                    />
                </div>
            </div>
        </>
    );
};

export default AvailabilitySetUpForm;