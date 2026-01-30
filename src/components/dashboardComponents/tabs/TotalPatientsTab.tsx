import React from "react";
import Title from "../../Title";
import { yearlySummary } from "../../../utils/DashboardCardsConstants";
import LineGraph1 from "../graphs/LineGraph1";
import { totalPatientsData } from "../../../utils/YearlyGraphData";
import PatientTableContainer from "../../patientComponents/PatientTabContainer";
import { useSelector } from "react-redux";
import { selectPatientCounts } from "../../../store/selectors/patientSelectors";

const TotalPatientsTab: React.FC = () => {
    const totalPatients = yearlySummary.find(
        (item: any) => item.title === "Total Patients"
    );

    const { total } = useSelector(selectPatientCounts);

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-2 m-4 flex items-center gap-6">
                <div className="flex gap-4 items-center ml-6">
                    <div className={`w-14 h-14 ${totalPatients?.iconBg} rounded-full flex items-center justify-center`}>
                        {totalPatients?.icon}
                    </div>

                    <div>
                        <h3 className="text-2xl fontbold">{total}</h3>
                        <p className="text-sm text-gray-400">Total Patients</p>
                        <p className="text-xs text-green-500 font-semibold">
                            {totalPatients?.change}{" "}
                            <span className="text-gray-400 font-normal">{totalPatients?.change1}</span>
                        </p>
                    </div>
                </div>
                <div className="flex-1">
                <LineGraph1 data={totalPatientsData}
                color="#F59E0B"
                legendLabel="PATIENTS"/>
                </div>
            </div>

            <div className="ml-6">
                <Title text="Total Patients List" />
                <div className="mt-4 bg-white ">
                    <PatientTableContainer filterStatus="ALL"/>
                </div>
            </div>
        </div>
    );
};

export default TotalPatientsTab;

