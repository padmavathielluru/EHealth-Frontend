export type Meridiem = "AM" | "PM";

export interface TimeRange {
  startTime: string;
  startMeridiem: Meridiem;
  endTime: string;
  endMeridiem: Meridiem;
}

export interface AvailabilitySchemaType {
  location: string;
  day: string;
  consultationMode: string;
  slots: TimeRange[];
  breaks: TimeRange[];
}
