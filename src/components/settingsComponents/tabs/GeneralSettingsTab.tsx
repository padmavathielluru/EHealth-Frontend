import React from "react";
import ProfilePreferences from "../ProfilePreferences";
import Cost from "../Cost";
import Notifications from "../Notifications";
import Availability from "../Availability";
import Title from "../../Title";

const GeneralSettingsTab: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-6 space-y-8">
            <ProfilePreferences />
             <Notifications />  
            <Availability />
            <div>
            <Title text="Cost"/>
            <Cost />
            </div>
             <div className="flex gap-2 justify-end">
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