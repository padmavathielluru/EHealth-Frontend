

export const toMinutes = (
  time: string,
  meridiem: "AM" | "PM"
) => {
  if (!time) return null;

  const [h, m] = time.split(":").map(Number);
  let hour = h % 12;
  if (meridiem === "PM") hour += 12;

  return hour * 60 + m;
};
