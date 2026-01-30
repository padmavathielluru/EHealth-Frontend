import React from "react";

interface Props {
  value?: string;
  meridiem?: string;
  variant?: "slot" | "break";
}

const TimePartCell: React.FC<Props> = ({
  value,
  meridiem,
  variant = "slot",
}) => {
  const bg =
    variant === "break" ? "" : "";

  return (
    <div
      className={`px-3 py-3 text-center text-sm flex items-center justify-center ${bg}`}
    >
      {value ? `${value} ${meridiem ?? ""}` : "-"}
    </div>
  );
};

export default TimePartCell;
