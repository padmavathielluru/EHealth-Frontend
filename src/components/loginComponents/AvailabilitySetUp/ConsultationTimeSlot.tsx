import React, { useState } from "react";
import MinutesDropdown from "./MinutesDropdown";

interface Props {
    value: { slotDuration: number; buffer: number; }
    onChange: (data: { slotDuration: number; buffer: number }) => void;
}

const ConsultationTimeSlot: React.FC<Props> = ({ value, onChange }) => {
    const [slotDuration, setSlotDuration] = useState<number>(30);
    const [buffer, setBuffer] = useState<number>(5);

    return (
        <div className="p-6 sm:p-6 bg-white rounded-xl border border-gray-300 shadow-sm mt-2">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">Slot Duration</p>
                    <MinutesDropdown
                        value={slotDuration}
                        // onChange={setSlotDuration}
                        onChange={(slotDuration) =>
                            onChange({ ...value, slotDuration })
                        }
                    />
                </div>
                <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">Buffer between appointments</p>
                    <MinutesDropdown
                        value={buffer}
                        // onChange={setBuffer}
                        onChange={(buffer) =>
                            onChange({ ...value, buffer })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsultationTimeSlot;