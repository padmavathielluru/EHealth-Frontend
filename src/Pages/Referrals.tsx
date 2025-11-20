import React,{ useEffect }from "react";
import ReferralTable from "../components/ReferralTable";

const Referrals: React.FC = () => {
    useEffect(() => {

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow="hidden";

        return () => {

            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, []);
    
    return (
        <div className="mt-8">
            <ReferralTable />
        </div>
    );
};

export default Referrals;