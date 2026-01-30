import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { HIGHLIGHT_NAMES } from "../../utils/PatientTableConstants";
import Searchbar from "../Searchbar";
import Calendar from "../Calendar";
import Pagination from "../Pagination";

interface Props {
    rows: any[];
    getAvatarColor: (index: number) => string;
    getInitials: (name: string) => string;
}

const statusStyles: Record<string, any> = {
    NEW: {
        bg: "#FAE0FF",
        color: "#78008FBF",
    },
    ACTIVE: {
        bg: "#DDF4CC",
        color: "#317000BF",
    },
    INACTIVE: {
        bg: "#EFEFEF",
        color: "#757575BF",
    },
};


const PatientTableView: React.FC<Props> = ({
    rows,
    getAvatarColor,
    getInitials,
}) => {

    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchCondition, setSearchCondition] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredRows = rows.filter((p: any) => {
        return (
            p.id.toLowerCase().includes(searchId.toLowerCase()) &&
            p.patient.toLowerCase().includes(searchName.toLowerCase()) &&
            p.status.toLowerCase().includes(searchStatus.toLowerCase()) &&
            p.condition.toLowerCase().includes(searchCondition.toLowerCase()) &&
            p.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
            p.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
            (!selectedDate || p.lastVisit === selectedDate)
        );
    });

    useEffect(() => {
        if ((currentPage - 1) * rowsPerPage >= filteredRows.length) {
            setCurrentPage(1);
        }
    }, [filteredRows.length, currentPage]);

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const paginatedData = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSelect = (id: string) => {
        setSelectedPatients((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedPatients(filteredRows.map((p: any) => p.id));
        } else {
            setSelectedPatients([]);
        }
    };

    const allSelected =
        filteredRows.length > 0 &&
        filteredRows.every((p: any) => selectedPatients.includes(p.id));

    return (
        <>
            <TableContainer component={Paper} className="rounded-full  border-gray-200 min-w-[900px] md:min-w-full 
      overflow-auto max-h[78vh] lg:max-h-[69vh] scrollbar-thin scrollbar-thumb-gray-100">
                <Table className="[&_th]:border [&_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200">
                    <TableHead className="bg-gray-50">
                        <TableRow className="h-[67.91px]">
                            <TableCell padding="checkbox">
                                <Checkbox checked={allSelected} onChange={handleSelectAll} color="primary" />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Last Visit</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>

                        {/* Search Row */}
                        <TableRow className="bg-white">
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell><Searchbar placeholder="Search ID..." value={searchId} onChange={setSearchId} /></TableCell>
                            <TableCell><Searchbar placeholder="Search name..." value={searchName} onChange={setSearchName} /></TableCell>
                            <TableCell><Searchbar placeholder="Search status..." value={searchStatus} onChange={setSearchStatus} /></TableCell>
                            <TableCell><Searchbar placeholder="Search condition..." value={searchCondition} onChange={setSearchCondition} /></TableCell>
                            <TableCell>
                                <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
                            </TableCell>
                            <TableCell><Searchbar placeholder="Search phone..." value={searchPhone} onChange={setSearchPhone} /></TableCell>
                            <TableCell><Searchbar placeholder="Search email..." value={searchEmail} onChange={setSearchEmail} /></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((row: any, index: number) => (
                            <TableRow key={row.id} className="hover:bg-gray-50">
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedPatients.includes(row.id)} onChange={() => handleSelect(row.id)} color="primary" />
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>

                                    <Link to={`/patients/${encodeURIComponent(row.patient)}`} >
                                        <div className="flex items-center gap-3 curcor-pointer">
                                            <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold
                      text-sm ${getAvatarColor(index)}`}>
                                                {getInitials(row.patient)}
                                            </div>
                                            <span
                                                className={`font-medium ${HIGHLIGHT_NAMES.includes(row.patient)
                                                    ? "text-[#168BD9]"
                                                    : "text-gray-800"
                                                    }`}>
                                                {row.patient}
                                            </span>
                                        </div>
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        sx={{
                                            backgroundColor: row.status === "NEW" ? "#FAE0FF" : row.status === "ACTIVE" ? "#DDF4CC" : "#EFEFEF",
                                            color: row.status === "NEW" ? "#78008FBF" : row.status === "ACTIVE" ? "#317000BF" : "#757575BF",
                                            fontWeight: 500,
                                            fontSize: "0.75rem",
                                            borderRadius: "9999px",
                                            px: 1.5,
                                        }}
                                    />
                                </TableCell>

                                <TableCell>{row.condition}</TableCell>
                                <TableCell>{new Date(row.lastVisit).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>
                                    <a href={`mailto:${row.email}`} className="text-[#5C8DF6] underline hover:text-[#3F6BE0]">
                                        {row.email}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="mt-2">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage} />
            </div>
        </>
    );
};

export default PatientTableView;