import React, { useState } from "react";
import Title from "../components/Title";
import { Avatar, CardContent, Button } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

interface AppointmentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentRequests: any[];
}

const AppointmentRequestModal: React.FC<AppointmentRequestModalProps> = ({
  isOpen,
  onClose,
  appointmentRequests,
}) => {
  const [accepted, setAccepted] = useState<{ [key: number]: boolean }>({});
  const [rejected, setRejected] = useState<{ [key: number]: boolean }>({});

  const handleAcceptToggle = (index: number) => {
    setAccepted((prev) => ({ ...prev, [index]: !prev[index] }));
    setRejected((prev) => ({ ...prev, [index]: false }));
  };

  const handleRejectToggle = (index: number) => {
    setRejected((prev) => ({ ...prev, [index]: !prev[index] }));
    setAccepted((prev) => ({ ...prev, [index]: false }));
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0].charAt(0).toUpperCase()
      : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const getColorForName = (name: string) => {
    const colors = ["#C1EAC5", "#C1EAE8", "#C1CCEA", "#FBE9AE", "#e1919cff", "#D9C1EA", "#C1EAE8"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] h-[600px] rounded-2xl shadow-xl p-8 relative ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Title text="Appointment Requests" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pr-2"
        style={{maxHeight: "420px",}}>
          <CardContent className="flex flex-col mb-4 gap-[9px] p-0 rounded-[10px] bg-white flex-1">
            {appointmentRequests.map((p: any, i: number) => (
              <div
                key={i}
                className="rounded-[16px] flex items-center justify-between gap-[16px] p-[10px_12px] bg-gray-50 hover:shadow transition"
              >
                <div className="flex items-center gap-3">
                  {p.img ? (
                    <Avatar src={p.img} alt={p.name} />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: getColorForName(p.name),
                        color: "gray",
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      {getInitials(p.name)}
                    </Avatar>
                  )}
                  <div>
                    <h4 className="font-medium">{p.name}</h4>
                    <p className="text-xs text-gray-500">
                      {p.age}y • {p.gender} • {p.date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="small"
                    onClick={() => handleAcceptToggle(i)}
                    className={`!min-w-0 !p-2 !rounded-md !w-8 !h-8 flex items-center justify-center border transition ${accepted[i]
                        ? "!bg-green-400 !text-white !border-green-600"
                        : "!bg-gray-100 !text-gray-500 !border-gray-300"
                      }`}
                  >
                    <Check fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleRejectToggle(i)}
                    className={`!min-w-0 !p-2 !rounded-md !w-8 !h-8 flex items-center justify-center border transition ${rejected[i]
                        ? "!bg-red-400 !text-white !border-red-600"
                        : "!bg-gray-100 !text-gray-500 !border-gray-300"
                      }`}
                  >
                    <Close fontSize="small" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </div>
        <div className="flex justify-end gap-4 mt-7">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-600 hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestModal;
