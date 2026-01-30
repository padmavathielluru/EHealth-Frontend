import React from "react";
import Title from "../../Title";
import AvailabilityTable from "./AvailabilityTable";
import Cost from "../../settingsComponents/Cost";
import ConsultationTimeSlot from "./ConsultationTimeSlot";

const AvailabilitySetUpForm: React.FC = () => {
    return (
        <div className="">
           <AvailabilityTable />
           <div className="mt-6 select-none">
            <Title text="Setup Consultation Time Slot"/>
            <ConsultationTimeSlot/>
            </div>
            <div className="mt-6 select-none">
            <Title text="Enter Consultation Fees"/>
            <Cost />
            </div>
        </div>      
    );
};

export default AvailabilitySetUpForm;