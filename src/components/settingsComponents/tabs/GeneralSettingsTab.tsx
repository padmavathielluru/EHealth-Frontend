import React from "react";
import ProfilePreferences from "../ProfilePreferences";
import Cost from "../Cost";
import Notifications from "../Notifications";
import AvailabilityTable from "../../loginComponents/AvailabilitySetUp/AvailabilityTable";
import Title from "../../Title";
import ConsultationTimeSlot from "../../loginComponents/AvailabilitySetUp/ConsultationTimeSlot";

const GeneralSettingsTab: React.FC = () => {
    return (
        <div className="h-[460px] bg-white rounded-xl flex flex-col">  
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <ProfilePreferences />
             <Notifications />  
             <div className="mt-6">
                 <AvailabilityTable />
             </div>
            <div className="mt-6">
            <Title text="Consultation Time Slot"/>
            <ConsultationTimeSlot/>
            </div>
            <div>
            <Title text="Consultation Fees"/>
            <Cost />
            </div>
            </div>
             <div className="flex gap-2 justify-end sticky bottom-0 border-t pt-4 pb-4">
                <button type="button" className="bg-gray-100 text-gray-500 border border-gray-200 px-6 py-2 rounded-xl text-sm hover:bg-gray-200 transition">
                      Cancle
                </button>
                <button type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-600 transition">
                      Update
                </button>
            </div>
        </div>
        
    );
};

export default GeneralSettingsTab;