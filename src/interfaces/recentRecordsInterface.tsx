export interface RecentRecord {
    recordedOn: string;
    symptoms: string;
    recordedBy: string;
    severity: "SEVERE" | "MODERATE";
    doctorNote: string;
}