import React from "react";
import Title from "../../Title";
import { yearlySummary } from "../../../utils/DashboardCardsConstants";
import LineGraph1 from "../graphs/LineGraph1";
import { consultationsData } from "../../../utils/YearlyGraphData";
import PatientTableContainer from "../../patientComponents/PatientTabContainer";
import { useSelector } from "react-redux";
import { selectPatientCounts } from "../../../store/selectors/patientSelectors";

const ConsultationsTab: React.FC = () => {
    const consultations = yearlySummary.find(
        (item: any) => item.title === "Consultations"
    );

    const { activePatients } = useSelector(selectPatientCounts);

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-2 m-4 flex items-center gap-6">
                <div className="flex gap-4 items-center ml-6">
                    <div className={`w-14 h-14 ${consultations?.iconBg} rounded-full flex items-center justify-center`}>
                        {consultations?.icon}
                    </div>

                    <div>
                        <h3 className="text-2xl fontbold">{activePatients}</h3>
                        <p className="text-sm text-gray-400">Consultations</p>
                        <p className="text-xs text-green-500 font-semibold">
                            {consultations?.change}{" "}
                            <span className="text-gray-400 font-normal">{consultations?.change1}</span>
                        </p>
                    </div>
                </div>
                <div className="flex-1">
                <LineGraph1 data={consultationsData}
                color="#84C3FF"
                legendLabel="CONSULTATIONS"/>
                </div>
            </div>

            <div className="ml-6">
                <Title text="Consultations" />
                <div className="mt-4 bg-white ">
                    <PatientTableContainer filterStatus="ACTIVE"/>
                </div>
            </div>
        </div>
    );
};

export default ConsultationsTab;

