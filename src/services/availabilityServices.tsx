export const toggleWorkingDay = (
  index: number,
  selectedDays: boolean[],
  setSelectedDays: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  const updated = [...selectedDays];
  updated[index] = !updated[index];
  setSelectedDays(updated);
};
