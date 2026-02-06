import React, { useEffect, useRef, useState } from "react";
import { Box, Paper } from "@mui/material";
import AccessTime from "@mui/icons-material/AccessTime";
import { Event as CalendarEvent } from "../../store/calendarSlice";
import { addDays, getStartOfWeek } from "../../services/appointmentService";
import type { GetEventsForDateAndHour } from "./AppointmentsScheduleGrid";

const SLOT_HEIGHT = 64;

interface AppointmentsWeekGridProps {
  viewDate: Date;
  getEventsForDateAndHour: GetEventsForDateAndHour;
  onSlotClick?: (date: Date, hour: number, rect: DOMRect) => void;
  onEventClick?: (event: CalendarEvent, rect: DOMRect) => void;
}

export const AppointmentsWeekGrid: React.FC<AppointmentsWeekGridProps> = ({
  viewDate,
  getEventsForDateAndHour,
  onSlotClick,
  onEventClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const workWeekStart = getStartOfWeek(viewDate);
  const workWeekDays = Array.from({ length: 7 }, (_, i) => addDays(workWeekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const todayKey = new Date().toDateString();
  const linePosition =
    currentTime.getHours() * SLOT_HEIGHT + (currentTime.getMinutes() / 60) * SLOT_HEIGHT;
  const headerHeight = SLOT_HEIGHT;
  const lineTop = headerHeight + linePosition;

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCellClick = (date: Date, hour: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onSlotClick?.(date, hour, rect);
  };

  const handleEventCardClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onEventClick?.(event, rect);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        mt: 1,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          position: "relative",
          overflowY: "auto",
          height: "calc(100vh - 320px)",
          minHeight: 400,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "64px repeat(7, 1fr)",
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <Box
            sx={{
              height: SLOT_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <AccessTime sx={{ color: "text.secondary", fontSize: 24 }} />
          </Box>
          {workWeekDays.map((day) => {
            const isToday = day.toDateString() === todayKey;
            return (
              <Box
                key={day.toDateString()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: SLOT_HEIGHT,
                  fontWeight: 600,
                  letterSpacing: 1,
                  fontSize: "0.875rem",
                  borderRight: 1,
                  borderColor: "divider",
                  ...(isToday
                    ? { bgcolor: "grey.900", color: "white" }
                    : { bgcolor: "background.paper", color: "text.secondary" }),
                }}
              >
                {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()} -{" "}
                {String(day.getDate()).padStart(2, "0")}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: 64,
            right: 0,
            top: lineTop,
            height: 0,
            borderTop: "2px solid",
            borderColor: "error.main",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: -8,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "8px solid",
              borderRightColor: "error.main",
            }}
          />
        </Box>

        {hours.map((hour) => (
          <Box
            key={hour}
            sx={{
              display: "grid",
              gridTemplateColumns: "64px repeat(7, 1fr)",
              height: SLOT_HEIGHT,
              borderBottom: 1,
              borderColor: "grey.200",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                color: "text.secondary",
                borderRight: 1,
                borderColor: "divider",
              }}
            >
              {hour}
            </Box>
            {workWeekDays.map((day) => (
              <Box
                key={`${day.toDateString()}-${hour}`}
                onClick={(e) => handleCellClick(day, hour, e)}
                sx={{
                  position: "relative",
                  borderRight: 1,
                  borderColor: "grey.200",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {getEventsForDateAndHour(day, hour).map((event) => (
                  <Box
                    key={event.id}
                    onClick={(e) => handleEventCardClick(event, e)}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 1,
                      px: 0.75,
                      py: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid",
                      borderColor: event.colorBorder,
                      bgcolor: event.colorBg,
                      boxShadow: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ fontSize: "0.65rem", fontWeight: 600 }}>
                      {event.fromTime} → {event.toTime}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          bgcolor: event.colorBorder,
                          color: "white",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {event.patientName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </Box>
                      <Box component="span" sx={{ fontSize: "0.55rem" }}>
                        {event.visitType}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AppointmentsWeekGrid;
