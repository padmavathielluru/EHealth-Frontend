import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PatientTableView from "../patientComponents/PatientTableView";
// import { selectPatientsByStatus } from "../../store/selectors/patientSelectors";

interface Patient {
    id: string;
    patient: string;
    status: string;
    condition: string;
    lastVisit: string;
    phone: string;
    email: string;
}

interface PatientTableContainerProps {
    filterStatus?: "ALL" | "NEW" | "ACTIVE" | "INACTIVE"
}

const getAvatarColor = (index: number) => {
    const colors = [
        "bg-[#CFE8FC] text-[#1463B2]",
        "bg-[#FDE2E4] text-[#C03221]",
        "bg-[#E8EAF6] text-[#3949AB]",
        "bg-[#D0F4DE] text-[#2E7D32]",
        "bg-[#FFF3CD] text-[#A67C00]",
        "bg-[#E1F5FE] text-[#0277BD]",
        "bg-[#FAE0FF] text-[#78008FBF]",
        "bg-[#DDF4CC] text-[#317000BF]",
        "bg-[#EFEFEF] text-[#757575BF]",
    ];
    return colors[index % colors.length];
};

const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

const PatientTableContainer: React.FC<PatientTableContainerProps> = ({
    filterStatus = "ALL",
}) => {
    const { filtered } = useSelector((state: RootState) => state.patients);

    const statusFilteredRows=
        filterStatus === "ALL" ? filtered : filtered.filter(
            (p:Patient) => p.status.toUpperCase() === filterStatus
        );

    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchCondition, setSearchCondition] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;


    const finalFilteredList = filtered.filter((p: Patient) => {
        const matchesId = p.id.toLowerCase().includes(searchId.toLowerCase());
        const matchesName = p.patient.toLowerCase().includes(searchName.toLowerCase());
        const matchesStatus = p.status.toLowerCase().includes(searchStatus.toLowerCase());
        const matchesCondition = p.condition.toLowerCase().includes(searchCondition.toLowerCase());
        const matchesPhone = p.phone.toLowerCase().includes(searchPhone.toLowerCase());
        const matchesEmail = p.email.toLowerCase().includes(searchEmail.toLowerCase());
        const matchesDate = !selectedDate || p.lastVisit === selectedDate;

        return (
            matchesId &&
            matchesName &&
            matchesStatus &&
            matchesCondition &&
            matchesPhone &&
            matchesEmail &&
            matchesDate
        );
    });

    useEffect(() => {
        if ((currentPage - 1) * rowsPerPage >= finalFilteredList.length) {
            setCurrentPage(1);
        }
    }, [finalFilteredList.length, currentPage, rowsPerPage]);

    return (
        <PatientTableView
            rows={statusFilteredRows}
            getAvatarColor={getAvatarColor}
            getInitials={getInitials}
        />

    );
};

export default PatientTableContainer;
