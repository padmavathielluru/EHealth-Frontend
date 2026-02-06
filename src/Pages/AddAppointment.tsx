import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addEvent } from "../store/calendarSlice";
import { Event as CalendarEvent } from "../store/calendarSlice";
import AppointmentModal from "../modals/AppointmentModal";

const AddAppointment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => navigate("/appointment");

  const handleSave = (newEvent: CalendarEvent) => {
    dispatch(addEvent(newEvent));
    navigate("/appointment");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      {/* Single container: back arrow + form */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
          overflow: "hidden",
        }}
      >
        <Box sx={{ pt: 1, px: 1, pb: 0 }}>
          <IconButton
            onClick={goBack}
            size="medium"
            aria-label="Go back"
            sx={{ color: "text.primary" }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <AppointmentModal
            embedInPage
            onClose={goBack}
            selectedDate={null}
            selectedTime={null}
            onSave={handleSave}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddAppointment;
