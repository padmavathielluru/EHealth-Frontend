export interface AlertsState {
  appointment: boolean;
  patient: boolean;
  system: boolean;
  care: boolean;
}

export interface ChannelsState {
  email: boolean;
  sms: boolean;
  app: boolean;
}

export interface ToggleRowProps {
  label?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  variant?: "row" | "header";
}
