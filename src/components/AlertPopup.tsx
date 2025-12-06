import React from "react";

interface AlertPopupProps {
  open: boolean;
  message: string;
  type?: "success" | "info" | "warning" | "error";
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  open,
  message,
  type = "info",
  onClose,
}) => {
  if (!open) return null;

  const alertColors: Record<string, string> = {
    success: "bg-green-100 text-green-800 border-green-500",
    info: "bg-blue-100 text-blue-800 border-blue-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
    error: "bg-red-100 text-red-800 border-red-500",
  };

  const alertTitles: Record<string, string> = {
    success: "SUCCESS",
    info: "INFO",
    warning: "WARNING",
    error: "ERROR",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 animate-fadeIn">
        <div
          className={`border-l-4 p-4 rounded ${alertColors[type]}`}
        >
            <h2 className="text-lg font-bold mb-1 tracking-wide">
                {alertTitles[type]}
            </h2>
          <p className="text-sm font-semibold">
            {message}
            </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
