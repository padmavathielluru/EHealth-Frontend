import { CostFormType } from "../components/commonComponents/schema"

export const fees: {key: keyof CostFormType; label: string; }[]= [
  {key: "consultationFee", label:"Initial Consultation"},
  {key: "followUpFee", label:"Follow-up Consultation"},
  {key: "telemedicineFee", label: "Telemedicine Consultation"},
  {key: "emergencyFee", label: "Emergency Consultation"},
];

export const currencies = ["₹", "$", "€", "£"];