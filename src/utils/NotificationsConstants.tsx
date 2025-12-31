import { AlertsState, ChannelsState } from "../interfaces/notificationsInterface";

export const DEFAULT_ALERTS: AlertsState = {
  appointment: true,
  patient: true,
  system: true,
  care: true,
};

export const DEFAULT_CHANNELS: ChannelsState = {
  email: true,
  sms: true,
  app: true,
};

export const ALERT_LABELS = {
  appointment: "Appointment reminders",
  patient: "Patient messages",
  system: "System alerts",
  care: "Integrative Care Provider",
};

export const CHANNEL_LABELS = {
  email: "Email",
  sms: "SMS",
  app: "In-App",
};
