import { CostFormType } from "../schemas/schema";

export type FeeKey = keyof CostFormType["inClinic"];

export const fees: { key: FeeKey; label: string }[] = [
  { key: "consultationFee", label: "Initial Consultation" },
  { key: "followUpFee", label: "Follow-up Consultation" },
  { key: "emergencyFee", label: "Emergency Consultation" },
];

export const currencies = ["₹", "$", "€", "£"];
