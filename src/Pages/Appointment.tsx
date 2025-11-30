import React, { useEffect } from "react";
import CalendarM from "../components/CalendarM";

const Appointment: React.FC = () => {
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="appointment-page min-h-screen bg-gray-100 overflow-hidden">
      <CalendarM />
      {/* <div className="mt-4">
        <h1 className="text-xl font-bold">Appointments</h1>
      </div> */}
    </div>
  );
};

export default Appointment;
