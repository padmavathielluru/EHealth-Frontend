import React, { useEffect } from "react";
import { AppointmentsView } from "../components/Appointments";

const Appointment: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="appointment-page w-full min-w-0 min-h-screen bg-gray-100 overflow-x-hidden overflow-y-auto select-none">
      <AppointmentsView />
    </div>
  );
};

export default Appointment;
