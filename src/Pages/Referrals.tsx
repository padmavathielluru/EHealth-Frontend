import React, { useEffect } from "react";
import ReferralTable from "../components/ReferralTable";

const Referrals: React.FC = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mt-8">
            <ReferralTable />
        </div>
    );
};

export default Referrals;