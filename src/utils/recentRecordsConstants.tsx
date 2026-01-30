import { RecentRecord } from "../interfaces/recentRecordsInterface";

export const TABLE_HEADERS = [
    "RECORDED ON",
    "SYMPTOMS",
    "RECORDED BY",
    "SEVERITY",
    "DOCTOR NOTE",
    "ASSOCIATED ACTIONS",
];

export const recentRecordsData: RecentRecord[] = [
    {
        recordedOn: "15/08/2025",
        symptoms: "Headache",
        recordedBy: "Dr. John Doe",
        severity: "SEVERE",
        doctorNote: "Lorem ipsum dolor sit amet, sonsectetur adipiscing elit. Fusce cur",
    },
     {
        recordedOn: "15/08/2025",
        symptoms: "Hypertension",
        recordedBy: "Evercare Clinic",
        severity: "SEVERE",
        doctorNote: "Lorem ipsum dolor sit amet, sonsectetur adipiscing elit. Fusce cur",
    },
    {
    recordedOn: "15/08/2025",
    symptoms: "Bleeding",
    recordedBy: "CareFirst Medical",
    severity: "MODERATE",
    doctorNote:
      "Fusce cursus, quam nec fermentum pretium, arcu tellus viverra odio, id lao...",
  },

];