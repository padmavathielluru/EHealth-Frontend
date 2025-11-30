export type DateCheckResult = {
  valid: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
};

export const checkPastDate = (selectedDate: Date): DateCheckResult => {
  const today = new Date();
  const dateOnly = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  if (dateOnly < todayOnly) {
    return {
      valid: false,
      type: "error",
      message: "Selected date is already completed. You cannot choose a past date.",
    };
  }

  return { valid: true, type: "success", message: "" };
};


export const checkPastTime = (
  selectedDate: Date,
  hours: number,
  minutes: number
): DateCheckResult => {
  const now = new Date();

  const selectedTime = new Date(selectedDate);
  selectedTime.setHours(hours, minutes, 0, 0);

  const isToday =
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();

  if (isToday && selectedTime < now) {
    return {
      valid: false,
      type: "warning",
      message: "Selected time is already completed. You cannot choose a past time.",
    };
  }

  return { valid: true, type: "success", message: "" };
};
