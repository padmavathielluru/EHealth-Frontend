import React, { useState } from "react";
import ProfilePreferences from "../ProfilePreferences";
import Cost from "../Cost";
import Notifications from "../Notifications";
import AvailabilityTable from "../../loginComponents/AvailabilitySetUp/AvailabilityTable";
import Title from "../../Title";
import ConsultationTimeSlot from "../../loginComponents/AvailabilitySetUp/ConsultationTimeSlot";
import { validateAvailabilityPage } from "../../../schemas/AvailabilityPageSchema";
import { AvailabilityRow } from "../../loginComponents/AvailabilitySetUp/AvailabilityTable";
import { CostFormType } from "../../../schemas/schema";

const GeneralSettingsTab: React.FC = () => {
    const [availability, setAvailability] = useState<AvailabilityRow[]>([]);
    const [consultationSlot, setConsultationSlot] = useState({
        slotDuration: 30,
        buffer: 5,
    });
    const [errors, setErrors] = useState<{
        availability?: string;
        consultationSlot?: string;
        consultationFee?: string;
    }>({});

    const [consultationFee, setConsultationFee] = useState<CostFormType | null>(null);

    const handleUpdate = () => {
        const validationErrors = validateAvailabilityPage({
            availability,
            consultationSlot,
            consultationFee,
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;
    };
    return (
        <div className="h-[460px] bg-white rounded-xl flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <ProfilePreferences />
                <Notifications />
                <div className="mt-6">
                    <AvailabilityTable
                        value={availability}
                        onChange={setAvailability}
                        error={errors.availability}
                    />

                </div>
                <div className="mt-6">
                    <Title text="Consultation Time Slot" />
                    {errors.consultationSlot && (
                        <p className="text-xs text-red-500 mt-2">
                            {errors.consultationSlot}</p>
                    )}

                    <ConsultationTimeSlot
                        value={consultationSlot}
                        onChange={setConsultationSlot} />
                </div>
                <div>
                    <Title text="Consultation Fees" />
                    {errors.consultationFee && (
                        <p className="text-xs text-red-500 mt-2">
                            {errors.consultationFee}
                        </p>
                    )}
                    <Cost
                        value={consultationFee}
                        onChange={setConsultationFee}
                    />
                </div>
            </div>
            <div className="flex gap-2 justify-end sticky bottom-0 border-t pt-4 pb-4">
                <button type="button" className="bg-gray-100 text-gray-500 border border-gray-200 px-6 py-2 rounded-xl text-sm hover:bg-gray-200 transition">
                    Cancle
                </button>
                <button type="submit"
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-600 transition">
                    Update
                </button>
            </div>
        </div>

    );
};

export default GeneralSettingsTab;