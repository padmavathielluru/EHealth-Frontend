import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
} from "@mui/material";
import Searchbar from "./Searchbar";
import Calendar from "./Calendar";
import Pagination from "../components/Pagination";
import { HIGHLIGHT_NAMES, PATIENTS } from "../utils/PatientTableConstants";
import { Button, IconButton } from "@mui/material";



interface Patient {
  id: string;
  patient: string;
  status: "NEW" | "ACTIVE" | "INACTIVE";
  condition: string;
  lastVisit: string;
  phone: string;
  email: string;
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

const PatientTable: React.FC = () => {
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

  const [openUpload, setOpenUpload] = useState(false);

  const filteredPatients = PATIENTS.filter((p) => {
    const matchesId = p.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesName = p.patient.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = p.status.toLowerCase().includes(searchStatus.toLowerCase());
    const matchesCondition = p.condition.toLowerCase().includes(searchCondition.toLowerCase());
    const matchesPhone = p.phone.toLowerCase().includes(searchPhone.toLowerCase());
    const matchesEmail = p.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesDate = !selectedDate || p.lastVisit === selectedDate;

    return matchesId && matchesName && matchesStatus && matchesCondition && matchesPhone && matchesEmail && matchesDate;
  });

  if ((currentPage - 1) * rowsPerPage >= filteredPatients.length) {
    setCurrentPage(1);
  }


  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);


  const paginatedData = filteredPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelect = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedPatients(filteredPatients.map((p) => p.id));
    else setSelectedPatients([]);
  };

  const allSelected = filteredPatients.length > 0 && filteredPatients.every((p) => selectedPatients.includes(p.id));

  const [active, setActive] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: 24 },
    { id: "active", label: "Active", count: 12 },
    { id: "inactive", label: "Inactive", count: 8 },
    { id: "new", label: "New", count: 4 },
  ];

  return (
    <div className="-mt-3">
      <div className="flex items-center justify-between w-full mb-2 ">
        
        <div className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full">
          {tabs.map((t) => (
            <Button
              key={t.id}
              onClick={() => setActive(t.id)}
              disableElevation
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                padding: "6px 16px",
                fontWeight: 600,
                backgroundColor: active === t.id ? "white" : "transparent",
                color: active === t.id ? "#111" : "#4b5563",
                boxShadow:
                  active === t.id ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <span>{t.label}</span>
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full 
              ${active === t.id
                    ? "bg-gray-100 text-black"
                    : "bg-white text-gray-700"
                  }`}
              >
                {t.count}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">

          <Button
            variant="outlined"
            onClick={() => setOpenUpload(true)}
            sx={{
              borderRadius: "12px",
              borderColor: "#1A73E8",
              color: "#1A73E8",
              textTransform: "none",
              fontWeight: 500,
              padding: "6px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "white",
              fontSize: "15px",
            }}
          >
            <img
              src="/images/fi_upload.svg"
              alt="upload"
              style={{ width: 20, height: 20 }}
            />
            Upload
          </Button>


          {/* VERTICAL DIVIDER */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* DOWNLOAD ICON */}
          <IconButton
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/images/download-02.svg"
              alt="download"
              style={{ width: 22, height: 22, opacity: 0.8 }}
            />
          </IconButton>

          {/* TRASH ICON */}
          <IconButton
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/images/fi_trash-2.svg"
              alt="trash"
              style={{ width: 22, height: 22, opacity: 0.8 }}
            />
          </IconButton>

        </div>

      </div>
      <TableContainer component={Paper} className="rounded-full  border-gray-200 ">
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
            {paginatedData.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedPatients.includes(row.id)} onChange={() => handleSelect(row.id)} color="primary" />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm ${getAvatarColor(index)}`}>
                      {getInitials(row.patient)}
                    </div>
                    <span className={`font-medium ${HIGHLIGHT_NAMES.includes(row.patient) ? "text-[#168BD9]" : "text-gray-800"}`}>
                      {row.patient}
                    </span>
                  </div>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {/* UPLOAD MODAL */}
      {openUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-30  flex items-center  justify-center z-50">
          <div className="bg-white h-[444px] w-[704px] rounded-2xl p-6 shadow-lg relative">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload</h2>


              <button
                onClick={() => setOpenUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <img
                  src="/images/x-01.svg"
                  alt="Add"
                  className="w-5 h-5 mr-1"
                />
              </button>
            </div>

            {/* DROPPABLE AREA */}
            <div className="border border-dashed border-gray-300 rounded-xl py-14 flex flex-col items-center gap-3 bg-gray-50">

              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <img src="/images/excel-svgrepo-com 1.svg" className="w-8 h-8" />
              </div>


              <p className="text-gray-600">
                Drag your files here or{" "}
                <span className="text-blue-600 font-medium cursor-pointer">Browse</span>
              </p>

              <p className="text-xs text-gray-400">File should be .xls & .xlsx</p>
            </div>

            {/* SAMPLE DOWNLOAD */}
            <div className="mt-6 text-center">
              <button className="text-gray-600 text-sm flex items-center justify-center mx-auto gap-2 hover:text-black">
                <img src="/images/download-02.svg" className="w-4" />
                Download Sample file
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PatientTable;

