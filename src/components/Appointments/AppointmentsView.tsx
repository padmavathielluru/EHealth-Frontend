import React, { useState, forwardRef } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Event as CalendarEvent, addEvent } from "../../store/calendarSlice";
import { selectAllEvents } from "../../store/selectors/calendarSelectors";
import {
  getEventsForDateAndHour,
  addDays,
  getStartOfWeek,
} from "../../services/appointmentService";
import { checkPastDate, checkPastTime } from "../../services/dateTimeService";
import AppointmentModal from "../../modals/AppointmentModal";
import Popup from "../Popup";
import AlertPopup from "../AlertPopup";
import { AppointmentsScheduleGrid } from "./AppointmentsScheduleGrid";
import { AppointmentsWeekGrid } from "./AppointmentsWeekGrid";
import { AppointmentsMonthGrid } from "./AppointmentsMonthGrid";
import { AppointmentsMobileView } from "./AppointmentsMobileView";
import useIsMobile from "../../hooks/UseIsMobile";

type ViewMode = "day" | "week" | "month";

const CustomDateInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; displayValue?: string }
>(({ onClick, displayValue, value }, ref) => (
  <Typography
    component="button"
    ref={ref}
    type="button"
    variant="body1"
    onClick={onClick}
    sx={{
      minWidth: 180,
      textAlign: "center",
      fontWeight: 500,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      py: 0.5,
      px: 1,
      borderRadius: 1,
      "&:hover": { bgcolor: "action.hover" },
    }}
  >
    {displayValue ?? value}
  </Typography>
));

export const AppointmentsView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector(selectAllEvents);
  const isMobile = useIsMobile();

  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFromCellClick, setIsFromCellClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    type: "info" as "success" | "info" | "warning" | "error",
  });

  const getEventsForDateAndHourForGrid = (date: Date, hour: number): CalendarEvent[] =>
    getEventsForDateAndHour(events, date, hour);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPopupPosition(null);
    setIsFromCellClick(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleAddAppointment = () => {
    // Mobile only: navigate to add page. Web: keep existing modal behavior (do not navigate).
    if (isMobile) {
      navigate("/appointment/add");
      return;
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedEvent(null);
    setPopupPosition(null);
    setIsFromCellClick(false);
    setIsModalOpen(true);
  };

  const handleSlotClick = (date: Date, hour: number, rect: DOMRect) => {
    const dateCheck = checkPastDate(date);
    if (!dateCheck.valid) {
      setAlertData({ open: true, message: dateCheck.message, type: dateCheck.type });
      return;
    }
    const timeCheck = checkPastTime(date, hour, 0);
    if (!timeCheck.valid) {
      setAlertData({ open: true, message: timeCheck.message, type: timeCheck.type });
      return;
    }

    const existingEvents = getEventsForDateAndHourForGrid(date, hour);
    if (existingEvents.length > 0) {
      setPopupPosition({
        top: rect.top + window.scrollY + 30,
        left: rect.left + rect.width + 10,
      });
      setSelectedEvent(existingEvents[0]);
      setIsModalOpen(false);
    } else {
      setSelectedDate(date);
      setSelectedTime(`${hour}:00`);
      setSelectedEvent(null);
      setPopupPosition(null);
      setIsFromCellClick(true);
      setIsModalOpen(true);
    }
  };

  const handleEventClick = (event: CalendarEvent, rect: DOMRect) => {
    setPopupPosition({
      top: rect.top + window.scrollY + rect.height + 10,
      left: rect.left + rect.width / 2,
    });
    setSelectedEvent(event);
  };

  const handleDatePrev = () => {
    if (viewMode === "week") {
      setViewDate(addDays(getStartOfWeek(viewDate), -7));
      return;
    }
    const d = new Date(viewDate);
    if (viewMode === "day") d.setDate(d.getDate() - 1);
    else d.setMonth(d.getMonth() - 1);
    setViewDate(d);
  };

  const handleDateNext = () => {
    if (viewMode === "week") {
      setViewDate(addDays(getStartOfWeek(viewDate), 7));
      return;
    }
    const d = new Date(viewDate);
    if (viewMode === "day") d.setDate(d.getDate() + 1);
    else d.setMonth(d.getMonth() + 1);
    setViewDate(d);
  };

  const handleToday = () => {
    const now = new Date();
    setViewDate(viewMode === "week" ? getStartOfWeek(now) : now);
  };

  const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, v: ViewMode | null) => {
    if (v == null) return;
    setViewMode(v);
    if (v === "week") setViewDate(getStartOfWeek(viewDate));
    if (v === "day") setViewDate(new Date()); // day view shows current date by default
  };

  const formatDateLabel = () => {
    if (viewMode === "day") {
      return viewDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    if (viewMode === "week") {
      const start = getStartOfWeek(viewDate);
      const end = addDays(start, 6);
      return `${start.toLocaleDateString("en-US", { month: "short" })} ${String(
        start.getDate()
      ).padStart(2, "0")} - ${end.toLocaleDateString("en-US", {
        month: "short",
      })} ${String(end.getDate()).padStart(2, "0")}, ${end.getFullYear()}`;
    }
    return viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleMonthDayClick = (date: Date) => {
    setViewDate(date);
    setViewMode("day");
  };

  const handleMobileEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setPopupPosition({
      top: window.innerHeight / 2 - 100,
      left: window.innerWidth / 2,
    });
  };

  if (isMobile) {
    return (
      <Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%" }}>
        <AppointmentsMobileView
          viewDate={viewDate}
          onViewDateChange={setViewDate}
          events={events}
          onAddAppointment={handleAddAppointment}
          onEventClick={handleMobileEventClick}
        />
        {selectedEvent && popupPosition && (
          <Popup
            event={selectedEvent}
            position={popupPosition}
            onClose={() => {
              setSelectedEvent(null);
              setPopupPosition(null);
            }}
          />
        )}
        {isModalOpen && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.2)",
            }}
            onClick={handleCloseModal}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "relative",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                width: "100%",
                maxWidth: 600,
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <AppointmentModal
                onClose={handleCloseModal}
                selectedDate={isFromCellClick ? selectedDate : null}
                selectedTime={isFromCellClick ? selectedTime : null}
                onSave={(newEvent) => {
                  dispatch(addEvent(newEvent));
                  handleCloseModal();
                }}
              />
            </Box>
          </Box>
        )}
        <AlertPopup
          open={alertData.open}
          message={alertData.message}
          type={alertData.type}
          onClose={() =>
            setAlertData({ open: false, message: "", type: "info" })
          }
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%", py: 1 }}>
      {/* Web view toolbar: Today | Day/Week/Month | Date nav | + Add Appointment (right) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={handleToday}
            sx={{
              bgcolor: "grey.900",
              color: "white",
              borderRadius: "24px",
              px: 2.5,
              py: 1.25,
              fontWeight: 600,
              "&:hover": { bgcolor: "grey.800" },
            }}
          >
            Today
          </Button>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            sx={{
              bgcolor: "grey.100",
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: "24px",
              p: 0.25,
              "& .MuiToggleButtonGroup-grouped": {
                border: "none",
                px: 2.5,
                py: 1,
                fontWeight: 600,
                textTransform: "none",
                "&:first-of-type": { borderRadius: "20px 0 0 20px" },
                "&:last-of-type": { borderRadius: "0 20px 20px 0" },
                "&:not(:first-of-type)": { borderLeft: 0 },
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                  "&:hover": { bgcolor: "primary.light" },
                },
                "&:not(.Mui-selected)": {
                  bgcolor: "transparent",
                  color: "text.secondary",
                  "&:hover": { bgcolor: "action.hover" },
                },
              },
            }}
          >
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              onClick={handleDatePrev}
              size="medium"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <DatePicker
              selected={viewDate}
              onChange={(d) => setViewDate(d || new Date())}
              dateFormat={viewMode === "month" ? "MMMM yyyy" : "MMMM d, yyyy"}
              showMonthYearPicker={viewMode === "month"}
              customInput={
                <CustomDateInput displayValue={formatDateLabel()} />
              }
            />
            <IconButton
              onClick={handleDateNext}
              size="medium"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* + Add Appointment - far right */}
        <Button
          variant="contained"
          onClick={handleAddAppointment}
          startIcon={<AddCircleOutline />}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            borderRadius: "24px",
            px: 2.5,
            py: 1.25,
            fontWeight: 600,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Add Appointment
        </Button>
      </Box>

      {viewMode === "day" && (
        <AppointmentsScheduleGrid
          viewDate={viewDate}
          getEventsForDateAndHour={getEventsForDateAndHourForGrid}
          onSlotClick={handleSlotClick}
          onEventClick={handleEventClick}
        />
      )}

      {viewMode === "week" && (
        <AppointmentsWeekGrid
          viewDate={viewDate}
          getEventsForDateAndHour={getEventsForDateAndHourForGrid}
          onSlotClick={handleSlotClick}
          onEventClick={handleEventClick}
        />
      )}

      {viewMode === "month" && (
        <AppointmentsMonthGrid viewDate={viewDate} onDayClick={handleMonthDayClick} />
      )}

      {selectedEvent && popupPosition && (
        <Popup
          event={selectedEvent}
          position={popupPosition}
          onClose={() => {
            setSelectedEvent(null);
            setPopupPosition(null);
          }}
        />
      )}

      {isModalOpen && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.1)",
          }}
          onClick={handleCloseModal}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              width: "100%",
              maxWidth: 600,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <AppointmentModal
              onClose={handleCloseModal}
              selectedDate={isFromCellClick ? selectedDate : null}
              selectedTime={isFromCellClick ? selectedTime : null}
              onSave={(newEvent) => {
                dispatch(addEvent(newEvent));
                handleCloseModal();
              }}
            />
          </Box>
        </Box>
      )}

      <AlertPopup
        open={alertData.open}
        message={alertData.message}
        type={alertData.type}
        onClose={() =>
          setAlertData({ open: false, message: "", type: "info" })
        }
      />
    </Box>
  );
};

export default AppointmentsView;
