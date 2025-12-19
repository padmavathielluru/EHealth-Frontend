import React, { useRef } from "react";

interface DateYearCalendarProps {
  value: string;
  onChange: (formattedValue: string,rawValue: string) => void;
  hasError?: boolean;
  placeholder?: string;
  className?: string;
}

const DateYearCalendar: React.FC<DateYearCalendarProps> = ({
  value,
  onChange,
  hasError = false,
  placeholder = "DD/MM/YYYY",
  className = "",
}) => {
  const dateRef = useRef<HTMLInputElement | null>(null);
  const formatDateInput = (val: string) => {
    const numbersOnly = val.replace(/\D/g, "");

    if (numbersOnly.length <= 2) {
      return numbersOnly;
    }
    if (numbersOnly.length <= 4) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    }
    return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(
      2,
      4
    )}/${numbersOnly.slice(4, 8)}`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatDateInput(e.target.value), e.target.value);
  };

  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split("-");
    const formatted =`${d}/${m}/${y}`;
    onChange(formatted, formatted);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleTextChange}
        placeholder={placeholder}
        maxLength={10}
        className={`w-full h-9 px-2 pr-8 border rounded-lg text-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${hasError ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-1 focus:ring-blue-500"}`}/>
      <input
        ref={dateRef}
        type="date"
        className="hidden"
        onChange={handleCalendarChange}/>

      <img
        src="/images/fi_calendar (2).svg"
        alt="calendar"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
        onClick={() => {
          if (dateRef.current?.showPicker) {
            dateRef.current.showPicker();
          } else {
            dateRef.current?.click();
          }
        }}
      />
    </div>
  );
};

export default DateYearCalendar;
