import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, useTheme } from "@mui/material";
import AccessTime from "@mui/icons-material/AccessTime";
import { Event as CalendarEvent } from "../../store/calendarSlice";

const SLOT_HEIGHT = 64;
const HOURS_START = 0;
const HOURS_END = 24;

export type GetEventsForDateAndHour = (date: Date, hour: number) => CalendarEvent[];

interface AppointmentsScheduleGridProps {
  viewDate: Date;
  getEventsForDateAndHour: GetEventsForDateAndHour;
  onSlotClick?: (date: Date, hour: number, rect: DOMRect) => void;
  onEventClick?: (event: CalendarEvent, rect: DOMRect) => void;
}

export const AppointmentsScheduleGrid: React.FC<AppointmentsScheduleGridProps> = ({
  viewDate,
  getEventsForDateAndHour,
  onSlotClick,
  onEventClick,
}) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isToday =
    viewDate.getFullYear() === currentTime.getFullYear() &&
    viewDate.getMonth() === currentTime.getMonth() &&
    viewDate.getDate() === currentTime.getDate();

  const linePosition =
    currentTime.getHours() * SLOT_HEIGHT +
    (currentTime.getMinutes() / 60) * SLOT_HEIGHT;

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isToday) {
      const position =
        currentTime.getHours() * SLOT_HEIGHT +
        (currentTime.getMinutes() / 60) * SLOT_HEIGHT;
      scrollRef.current.scrollTo({
        top: Math.max(0, position - 200),
        behavior: "smooth",
      });
    }
  }, [viewDate, isToday]);

  const hours = Array.from(
    { length: HOURS_END - HOURS_START },
    (_, i) => HOURS_START + i
  );
  const dayLabel = viewDate
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  const dateNum = String(viewDate.getDate()).padStart(2, "0");

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
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "64px 1fr",
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <AccessTime sx={{ color: "text.secondary", fontSize: 24 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.900",
            color: "white",
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: "0.875rem",
          }}
        >
          {dayLabel} - {dateNum}
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          position: "relative",
          overflowY: "auto",
          height: "calc(100vh - 320px)",
          minHeight: 400,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {isToday && (
            <Box
              sx={{
                position: "absolute",
                left: 64,
                right: 0,
                top: linePosition,
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
          )}

          {hours.map((hour) => {
            const slotEvents = getEventsForDateAndHour(viewDate, hour);
            return (
              <Box
                key={hour}
                onClick={(e) => handleCellClick(viewDate, hour, e)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  height: SLOT_HEIGHT,
                  borderBottom: 1,
                  borderColor: "grey.200",
                  "&:hover .schedule-cell": {
                    bgcolor: "action.hover",
                  },
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
                <Box
                  className="schedule-cell"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    cursor: onSlotClick ? "pointer" : "default",
                    transition: theme.transitions.create("background-color"),
                  }}
                >
                  {slotEvents.map((event) => (
                    <Box
                      key={event.id}
                      onClick={(e) => handleEventCardClick(event, e)}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 1,
                        px: 1,
                        py: 0.75,
                        display: "flex",
                        flexDirection: "column",
                        border: "3px solid",
                        borderColor: event.colorBorder,
                        bgcolor: event.colorBg,
                        boxShadow: 1,
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "text.primary",
                          mb: 0.5,
                        }}
                      >
                        <span>{event.fromTime}</span>
                        <Box component="span" sx={{ fontSize: 10 }}>→</Box>
                        <span>{event.toTime}</span>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: event.colorBorder,
                              color: "white",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {event.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "grey.500",
                              }}
                            />
                            <Box
                              component="span"
                              sx={{ fontSize: "0.65rem", fontWeight: 600 }}
                            >
                              {event.visitType}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              event.visitMode === "Online"
                                ? "/images/fi_video.svg"
                                : "/images/Frame (1).svg"
                            }
                            alt=""
                            sx={{ width: 18, height: 18 }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default AppointmentsScheduleGrid;
