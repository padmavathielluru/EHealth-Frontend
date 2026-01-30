import React, { useState } from "react";
import MinutesDropdown from "./MinutesDropdown";

const ConsultationTimeSlot = () => {
    const [slotDuration, setSlotDuration] = useState<number>(30);
    const [buffer, setBuffer] = useState<number>(5);

    return (
        <div className="p-6 sm:p-6 bg-white rounded-xl border border-gray-300 shadow-sm mt-2">  
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">Slot Duration</p>
                    <MinutesDropdown
                            value={slotDuration}
                            onChange={setSlotDuration}
                    />
                </div>
                <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">Buffer between appointments</p>
                    <MinutesDropdown
                            value={buffer}
                            onChange={setBuffer}/>
                </div>
            </div>
        </div>
    );
};

export default ConsultationTimeSlot;