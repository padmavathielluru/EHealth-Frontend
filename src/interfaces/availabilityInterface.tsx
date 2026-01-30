export interface AvailabilityFormValues {
  year: string;
  fromTime: string;
  fromMeridiem: "AM" | "PM";
  toTime: string;
  toMeridiem: "AM" | "PM";
}

export interface ToggleDayService {
  toggleDay: (
    index: number,
    selectedDays: boolean[],
    setSelectedDays: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => void;
}
