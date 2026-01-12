import React from "react";
import Title from "../../Title";
import { yearlySummary } from "../../../utils/DashboardCardsConstants";
import LineGraph1 from "../graphs/LineGraph1";
import { newPatientsData } from "../../../utils/YearlyGraphData";
import PatientTableContainer from "../../patientComponents/PatientTabContainer";
import { useSelector } from "react-redux";
import { selectPatientCounts } from "../../../store/selectors/patientSelectors";

const NewPatientsTab: React.FC = () => {
    const newPatientsCard = yearlySummary.find(
        (item: any) => item.title === "New Patients"
    );

    const { newPatients: newPatientsCount } = useSelector(selectPatientCounts);

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-2 m-4 flex items-center gap-6">
                <div className="flex gap-4 items-center ml-6">
                    <div className={`w-14 h-14 ${newPatientsCard?.iconBg} rounded-full flex items-center justify-center`}>
                        {newPatientsCard?.icon}
                    </div>

                    <div>
                        <h3 className="text-2xl fontbold">{newPatientsCount}</h3>
                        <p className="text-sm text-gray-400">New Patients</p>
                        <p className="text-xs text-green-500 font-semibold">
                            {newPatientsCard?.change}{" "}
                            <span className="text-gray-400 font-normal">{newPatientsCard?.change1}</span>
                        </p>
                    </div>
                </div>
                <div className="flex-1">
                <LineGraph1 data={newPatientsData}
                color="#E484FF"
                legendLabel="NEW PATIENTS"/>
                </div>
            </div>

            <div className="ml-6">
                <Title text="New Patients List" />
                <div className="mt-4 bg-white ">
                    <PatientTableContainer filterStatus="NEW"/>
                </div>
            </div>
        </div>
    );
};

export default NewPatientsTab;

