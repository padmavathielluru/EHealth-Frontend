import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const WEEKDAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

interface AppointmentsMonthGridProps {
  viewDate: Date;
  onDayClick?: (date: Date) => void;
}

export const AppointmentsMonthGrid: React.FC<AppointmentsMonthGridProps> = ({
  viewDate,
  onDayClick,
}) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = (firstDay.getDay() + 6) % 7;
  const days: Date[] = [];

  for (let i = startWeekDay; i > 0; i--) {
    days.push(new Date(year, month, 1 - i));
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  while (days.length % 7 !== 0) {
    const nextDay = new Date(
      year,
      month + 1,
      days.length - startWeekDay - lastDay.getDate() + 1
    );
    days.push(nextDay);
  }

  const today = new Date();

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
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "grey.100",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {WEEKDAYS.map((day) => (
          <Box
            key={day}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "text.secondary",
              borderRight: 1,
              borderColor: "grey.200",
              "&:last-of-type": { borderRight: 0 },
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          minHeight: "calc(100vh - 320px)",
        }}
      >
        {days.map((day, idx) => {
          const isCurrentMonth = day.getMonth() === month;
          const isToday =
            day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();
          return (
            <Box
              key={idx}
              onClick={() => onDayClick?.(day)}
              sx={{
                p: 1,
                borderBottom: 1,
                borderRight: 1,
                borderColor: "grey.200",
                cursor: onDayClick ? "pointer" : "default",
                ...(isCurrentMonth
                  ? { bgcolor: "background.paper", "&:hover": { bgcolor: "action.hover" } }
                  : { bgcolor: "grey.50", color: "text.disabled" }),
              }}
            >
              {isToday ? (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {String(day.getDate()).padStart(2, "0")}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {String(day.getDate()).padStart(2, "0")}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default AppointmentsMonthGrid;
