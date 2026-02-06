import { RootState } from "../store";
import { Event } from "../calendarSlice";
import { getEventsForDate, getEventsForDateAndHour } from "../../services/appointmentService";

export const selectAllEvents = (state: RootState): Event[] =>
  state.calendar.events;

export const selectEventsForDate = (state: RootState, date: Date): Event[] =>
  getEventsForDate(state.calendar.events, date);

export const selectEventsForDateAndHour = (
  state: RootState,
  date: Date,
  hour: number
): Event[] =>
  getEventsForDateAndHour(state.calendar.events, date, hour);
