import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "../store/patientSlice";
import { RootState } from "../store/store";
import UploadModal from "../modals/UploadModal";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/UseIsMobile";
import InfoCard from "./patientComponents/InfoCard";
import PatientTableContainer from "./patientComponents/PatientTabContainer";

interface Patient {
  id: string;
  patient: string;
  status: "NEW" | "ACTIVE" | "INACTIVE";
  condition: string;
  lastVisit: string;
  phone: string;
  email: string;
}


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
  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [openUpload, setOpenUpload] = useState(false);

  const dispatch = useDispatch();

  const { filtered, counts } = useSelector((state: RootState) => state.patients);

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

  const paginatedData = finalFilteredList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [active, setActive] = useState("all");

  const handleTabclick = (id: string) => {
    setActive(id);
    dispatch(setTab(id));
  }

  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "active", label: "Active", count: counts.active },
    { id: "inactive", label: "Inactive", count: counts.inactive },
    { id: "new", label: "New", count: counts.new },
  ];

  return (
    <div className="-mt-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-2 gap-3">

        <div className={isMobile ? "inline-block" : "block"}>
          <div className={`inline-flex items-center gap-2 bg-gray-200 rounded-full px-2 py-1
        ${isMobile ? "flex-wrap px-1 py-1 " : "flex-nowrap px-2 py-1"}`}
            style={{
              width: isMobile ? "fit-content" : "450px",
              minWidth: isMobile ? "fit-content" : "450px",
            }}
          >
            {tabs.map((t) => (
              <Button
                key={t.id}
                onClick={() => handleTabclick(t.id)}
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
                  minWidth: isMobile ? "110px" : "auto",
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
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:gap-3">

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

          <div className="w-px h-8 bg-gray-300 hidden sm:block "></div>

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
      {!isMobile && (
        <PatientTableContainer />
      )}

      {isMobile && (
        <div
          className="mt-4 px-2 flex flex-col gap-4 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400"
          style={{ maxHeight: "60vh", }}>
          {paginatedData.map((row: Patient) => (
            <InfoCard
              key={row.id}
              name={row.patient}
              age={32}
              gender="Male"
              phone={row.phone}
              email={row.email}
              status={row.status}
              id={row.id}
              initials={getInitials(row.patient)}
            />
          ))}
        </div>
      )}
      <UploadModal open={openUpload}
        onClose={() => setOpenUpload(false)}
      />

    </div>
  );
};

export default PatientTable;

