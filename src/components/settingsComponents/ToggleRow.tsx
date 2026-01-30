import React from "react";
import { ToggleRowProps } from "../../interfaces/notificationsInterface";

const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  checked,
  onChange,
  variant = "row",
}) => {
  const isHeader = variant === "header";

  return (
    <div
      className={`flex items-center justify-between border-b pr-[30vh]
        ${isHeader ? "px-6 py-5 bg-white" : "py-4 pl-10 bg-gray-50"}`}>
      {label && (
        <p
          className={`${
            isHeader
              ? "text-lg font-medium text-gray-700"
              : "text-sm text-gray-600"
          }`}>
          {label}
        </p>
      )}

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"/>
        <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors" />
        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
      </label>
    </div>
  );
};

export default ToggleRow;
