import React, { useState, useMemo, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Searchbar from "../components/Searchbar";
import { useDispatch } from "react-redux";
import { addEvent, Event as CalendarEvent } from "../store/calendarSlice";
import { v4 as uuidv4 } from "uuid";
import AlertPopup from "../components/AlertPopup";
import { AlertColor } from "@mui/material";
import { checkPastDate, checkPastTime } from "../services/dateTimeService";

interface Patient {
  id: string;
  name: string;
  email: string;
}

interface AppointmentModalProps {
  onClose: () => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSave: (newEvent: CalendarEvent) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  onClose,
  selectedTime,
  selectedDate,
}) => {
  const dispatch = useDispatch();

  const [patientsList, setPatientsList] = useState<Patient[]>([
    { id: "PID158057", name: "John Doe", email: "john.doe@email.com" },
    { id: "PID158058", name: "Ananya Rao", email: "ananya.rao@email.com" },
    { id: "PID158059", name: "Vikram Singh", email: "vikram.singh@email.com" },
    { id: "PID158060", name: "Priya Jacob", email: "priya.jacob@email.com" },
    { id: "PID158061", name: "Rahul", email: "rahul.rahul@email.com" },
  ]);

  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-rose-200",
  ];

  const [localDate, setLocalDate] = useState<Date | null>(selectedDate);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const [selectedVisit, setSelectedVisit] = useState("");
  const [showVisitDropdown, setShowVisitDropdown] = useState(false);
  const [searchVisit, setSearchVisit] = useState("");

  const [visitMode, setVisitMode] = useState("Offline");
  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [fromHours, setFromHours] = useState("");
  const [fromMinutes, setFromMinutes] = useState("");
  const [fromAmpm, setFromAmpm] = useState("AM");

  const [toHours, setToHours] = useState("");
  const [toMinutes, setToMinutes] = useState("");
  const [toAmpm, setToAmpm] = useState("AM");

  const [fromAmpmOpen, setFromAmpmOpen] = useState(false);
  const [toAmpmOpen, setToAmpmOpen] = useState(false);

  const fromAmpmRef = useRef<HTMLDivElement | null>(null);
  const toAmpmRef = useRef<HTMLDivElement | null>(null);

  const [alertData, setAlertData] = useState<{
    open: boolean;
    message: string;
    type: AlertColor;
  }>({
    open: false,
    message: "",
    type: "warning",
  });

  useEffect(() => {
    if (selectedDate) setLocalDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedTime) return;

    const [hour, minute] = selectedTime.split(":").map(Number);
    let h = hour;
    let ampm = "AM";

    if (h >= 12) {
      ampm = "PM";
      if (h > 12) h -= 12;
    } else if (h === 0) h = 12;

    const toDate = new Date();
    toDate.setHours(hour, minute + 30);

    let th = toDate.getHours();
    let tampm = "AM";

    if (th >= 12) {
      tampm = "PM";
      if (th > 12) th -= 12;
    } else if (th === 0) th = 12;

    setFromHours(h.toString().padStart(2, "0"));
    setFromMinutes(minute.toString().padStart(2, "0"));
    setFromAmpm(ampm);

    setToHours(th.toString().padStart(2, "0"));
    setToMinutes(toDate.getMinutes().toString().padStart(2, "0"));
    setToAmpm(tampm);
  }, [selectedTime]);

  const filteredPatients = useMemo(
    () =>
      patientsList.filter((p) =>
        p.name.toLowerCase().includes(searchPatient.toLowerCase())
      ),
    [patientsList, searchPatient]
  );

  const filteredVisits = useMemo(() => {
    const visitTypes = [
      { label: "Follow-up Appointment", color: "bg-purple-500" },
      { label: "New Patient Appointment", color: "bg-blue-500" },
      { label: "Routine Check-up", color: "bg-green-500" },
      { label: "Emergency Appointment", color: "bg-red-500" },
      { label: "Lab Test/Diagnostic Appointment", color: "bg-pink-500" },
      { label: "Procedure/Surgery Appointment", color: "bg-orange-500" },
      { label: "Specialist Referral Appointment", color: "bg-teal-500" },
      { label: "Second Opinion Appointment", color: "bg-violet-500" },
      { label: "Medication Review Appointment", color: "bg-yellow-500" },
    ];

    return visitTypes.filter((v) =>
      v.label.toLowerCase().includes(searchVisit.toLowerCase())
    );
  }, [searchVisit]);

  const visitTypeColors: Record<string, { border: string; bg: string }> = {
    "Follow-up Appointment": { border: "#a254f0ff", bg: "#c19ee6ff" },
    "New Patient Appointment": { border: "#2563EB", bg: "#649ce4ff" },
    "Routine Check-up": { border: "#16A34A", bg: "#b5e8c7ff" },
    "Emergency Appointment": { border: "#DC2626", bg: "#e5a4a4ff" },
    "Lab Test/Diagnostic Appointment": { border: "#DB2777", bg: "#e9a4cbff" },
    "Procedure/Surgery Appointment": { border: "#F97316", bg: "#f0cd9fff" },
    "Specialist Referral Appointment": { border: "#0D9488", bg: "#a7eedeff" },
    "Second Opinion Appointment": { border: "#6427d5ff", bg: "#8d77efff" },
    "Medication Review Appointment": { border: "#EAB308", bg: "#FEF9C3" },
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleAddAppointment = () => {
    const formatTime = (h: string, m: string, a: string) => {
      if (!h || !m) return "";
      let hr = parseInt(h);
      if (a === "PM" && hr < 12) hr += 12;
      if (a === "AM" && hr === 12) hr = 0;
      return `${hr.toString().padStart(2, "0")}:${m.padStart(2, "0")}`;
    };

    const from = formatTime(fromHours, fromMinutes, fromAmpm);
    const to = formatTime(toHours, toMinutes, toAmpm);

    if (!localDate || !selectedPatient || !selectedVisit || !from || !to) {
      setAlertData({ open: true, message: "Please fill all fields", type: "warning" });
      return;
    }

    if (!checkPastDate(localDate).valid || !checkPastTime(localDate, ...from.split(":").map(Number)).valid) {
      setAlertData({ open: true, message: "Invalid date/time", type: "warning" });
      return;
    }

    const colors = visitTypeColors[selectedVisit] || { border: "#6B7280", bg: "#c4cddeff" };

    dispatch(
      addEvent({
        id: uuidv4(),
        patientName: selectedPatient.name,
        visitType: selectedVisit,
        visitMode,
        date: localDate.toISOString(),
        fromTime: from,
        toTime: to,
        reason,
        color: colors.border,
        colorBorder: colors.border,
        colorBg: colors.bg,
        initials: getInitials(selectedPatient.name),
      })
    );

    onClose();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (fromAmpmRef.current && !fromAmpmRef.current.contains(e.target as Node))
        setFromAmpmOpen(false);
      if (toAmpmRef.current && !toAmpmRef.current.contains(e.target as Node))
        setToAmpmOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* JSX unchanged — omitted for brevity */}
      {/* Keep your existing JSX exactly as-is */}
    </>
  );
};

export default AppointmentModal;
