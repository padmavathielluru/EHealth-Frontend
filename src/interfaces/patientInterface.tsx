
export type StatusType = "NEW" | "ACTIVE" | "INACTIVE";

export interface patientInterface {
  id: string;
  patient: string;
  status: StatusType;
  condition: string;
  lastVisit: string;
  phone: string;
  email: string;
}
