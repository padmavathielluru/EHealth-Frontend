import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Event as CalendarEvent } from "../../store/calendarSlice";
import {
  getEventsForDate,
  getDatesInMonth,
  getFirstOfMonth,
  formatTimeLabel,
} from "../../services/appointmentService";

interface AppointmentsMobileViewProps {
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  events: CalendarEvent[];
  onAddAppointment: () => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const ACCENT_COLORS = ["#F8B4C4", "#FDE68A", "#A5B4FC"];

export const AppointmentsMobileView: React.FC<AppointmentsMobileViewProps> = ({
  viewDate,
  onViewDateChange,
  events,
  onAddAppointment,
  onEventClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Build date list from selected month/year (service layer)
  const dates = getDatesInMonth(viewDate.getFullYear(), viewDate.getMonth());

  const dayEvents = getEventsForDate(events, viewDate);

  const isSelected = (d: Date) =>
    d.getDate() === viewDate.getDate() &&
    d.getMonth() === viewDate.getMonth() &&
    d.getFullYear() === viewDate.getFullYear();

  useEffect(() => {
    const dayIndex = viewDate.getDate() - 1;
    const idx = Math.max(0, Math.min(dayIndex, dates.length - 1));
    if (scrollRef.current && scrollRef.current.children[idx]) {
      (scrollRef.current.children[idx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [viewDate, dates.length]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - 5 + i);

  const handleMonthChange = (monthIndex: number) => {
    onViewDateChange(getFirstOfMonth(viewDate.getFullYear(), monthIndex));
  };

  const handleYearChange = (y: number) => {
    onViewDateChange(getFirstOfMonth(y, viewDate.getMonth()));
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        minHeight: "100vh",
        bgcolor: "#FFF5F5",
        pb: 3,
      }}
    >
      {/* Top row: Month, Year, Add (+) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          pt: 6,
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flex: 1, minWidth: 0 }}>
          <FormControl size="small" sx={{ minWidth: 90 }} fullWidth>
            <InputLabel id="mobile-month-label">Month</InputLabel>
            <Select
              labelId="mobile-month-label"
              label="Month"
              value={viewDate.getMonth()}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
            >
              {months.map((name, i) => (
                <MenuItem key={name} value={i}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 72 }} fullWidth>
            <InputLabel id="mobile-year-label">Year</InputLabel>
            <Select
              labelId="mobile-year-label"
              label="Year"
              value={viewDate.getFullYear()}
              onChange={(e) => handleYearChange(Number(e.target.value))}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <IconButton
          onClick={onAddAppointment}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
          aria-label="Add appointment"
        >
          <AddCircleOutline />
        </IconButton>
      </Box>

      {/* Horizontal date strip */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          px: 1.5,
          py: 2,
          "&::-webkit-scrollbar": { height: 4 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#e0e0e0", borderRadius: 2 },
        }}
      >
        {dates.map((d) => {
          const selected = isSelected(d);
          const dayName = dayLabels[d.getDay()];
          return (
            <Box
              key={d.getTime()}
              onClick={() => onViewDateChange(d)}
              sx={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                minWidth: 48,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: selected ? "grey.300" : "grey.200",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: selected ? "grey.700" : "grey.600",
                  }}
                >
                  {d.getDate()}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: selected ? "primary.main" : "transparent",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    color: selected ? "white" : "grey.600",
                  }}
                >
                  {dayName}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Appointment list */}
      <Box sx={{ px: 2 }}>
        {dayEvents.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              color: "text.secondary",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="body2">No appointments for this day</Typography>
          </Box>
        ) : (
          dayEvents.map((event, index) => {
            const accentColor =
              event.colorBorder || ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <Box
                key={event.id}
                onClick={() => onEventClick?.(event)}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mb: 2,
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "grey.700",
                    minWidth: 44,
                    pt: 1.5,
                  }}
                >
                  {formatTimeLabel(event.fromTime)}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    borderRight: "4px solid",
                    borderRightColor: accentColor,
                    cursor: onEventClick ? "pointer" : "default",
                  }}
                >
                  <Box sx={{ flex: 1, p: 1.5, minWidth: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: event.colorBorder || "primary.main",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          flexShrink: 0,
                        }}
                      >
                        {event.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "grey.800", fontSize: "0.95rem" }}
                        >
                          {event.patientName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "primary.main", fontWeight: 500, display: "block" }}
                        >
                          {event.visitType}
                        </Typography>
                        {event.reason && (
                          <Typography
                            variant="body2"
                            sx={{ color: "grey.600", mt: 0.5, fontSize: "0.8rem" }}
                          >
                            {event.reason}
                          </Typography>
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            display: "block",
                            mt: 0.5,
                            fontSize: "0.8rem",
                          }}
                        >
                          {event.fromTime} - {event.toTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default AppointmentsMobileView;
