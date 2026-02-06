import { api } from "../api";
import { API_ENDPOINTS } from "../api/endpoints";
import { Event } from "../store/calendarSlice";

// ---------- Date / calendar helpers (service layer) ----------

/**
 * Add n days to a date. Returns a new Date.
 */
export function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

/**
 * Get the start of the week (Monday) for a given date.
 */
export function getStartOfWeek(d: Date): Date {
  const copy = new Date(d);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(12, 0, 0, 0);
  return copy;
}

/**
 * Get the first day of a given month/year.
 */
export function getFirstOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

/**
 * Get all dates in a given month/year. Returns array of Date for each day (1..last).
 */
export function getDatesInMonth(year: number, month: number): Date[] {
  const lastDay = new Date(year, month + 1, 0);
  return Array.from(
    { length: lastDay.getDate() },
    (_, i) => new Date(year, month, i + 1)
  );
}

/**
 * Format event time string for display (strip AM/PM suffix).
 */
export function formatTimeLabel(fromTime: string): string {
  return fromTime.replace(/\s*(AM|PM)/i, "").trim();
}

/**
 * Parse event time string (e.g. "9:00 AM") to minutes since midnight for sorting.
 */
function parseTimeToMinutes(fromTime: string): number {
  const [time, ampm] = fromTime.split(" ");
  const [h, m] = (time || "0:00").split(":").map(Number);
  let hours = h || 0;
  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;
  return hours * 60 + (m || 0);
}

/**
 * Get all events for a given date, sorted by fromTime.
 */
export function getEventsForDate(events: Event[], date: Date): Event[] {
  const dateStr = date.toDateString();
  return events
    .filter((e) => new Date(e.date).toDateString() === dateStr)
    .sort((a, b) => parseTimeToMinutes(a.fromTime) - parseTimeToMinutes(b.fromTime));
}

/**
 * Get events for a given date and hour (24h). Handles AM/PM in fromTime.
 */
export function getEventsForDateAndHour(
  events: Event[],
  date: Date,
  hour: number
): Event[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    const [time, ampm] = event.fromTime.split(" ");
    let [h] = (time || "0").split(":");
    let eventHour = parseInt(h, 10);
    if (ampm === "PM" && eventHour !== 12) eventHour += 12;
    if (ampm === "AM" && eventHour === 12) eventHour = 0;
    return (
      eventDate.toDateString() === date.toDateString() && eventHour === hour
    );
  });
}

/**
 * API layer: fetch appointments (for future backend integration).
 */
export const appointmentService = {
  getAll: () => api.get<Event[] | null>(API_ENDPOINTS.APPOINTMENTS),
  getById: (id: string) =>
    api.get<Event | null>(API_ENDPOINTS.APPOINTMENT_BY_ID(id)),
  create: (event: Omit<Event, "id"> & { id?: string }) =>
    api.post<Event | null>(API_ENDPOINTS.APPOINTMENTS, event),
  update: (id: string, event: Partial<Event>) =>
    api.put<Event | null>(API_ENDPOINTS.APPOINTMENT_BY_ID(id), event),
  delete: (id: string) =>
    api.delete<unknown>(API_ENDPOINTS.APPOINTMENT_BY_ID(id)),
};
