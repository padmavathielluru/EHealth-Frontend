export interface Symptom {
  symptomName: string;
  severity?: "SEVERE" | "MEDIUM" | "MILD";
  description?: string;
}

export interface LabTest {
  testName: string;
  suggestedLab?: string;
}

export interface Referral {
  doctorName: string;
  specialization: string;
  notes?: string;
}

export interface Diagnosis {
  name: string;
  status?: "SUSPECTED" | "CONFIRMED";
  description?: string;
  labTests?: LabTest[];
  referrals?: Referral[];
}

export interface Prescription {
  medicationName: string;
  dosage: string;
  frequency: string;
  time: "AF" | "BF";
  route: string;
  startDate: string;
  duration: string;
}

export interface PrescriptionReferral {
  description: string;
}

export interface Pharmacy {
  name: string;
  location: string;
}

export interface Appointment {
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  symptoms: Symptom[];
  diagnosis: Diagnosis[];
  prescriptions?: Prescription[];
  prescriptionReferral?: PrescriptionReferral;
  suggestedPharmacy?: Pharmacy;
  referrals: string[];
}

export interface HistoryItem {
  cid: string;
  date: string;
  appointments: Appointment[];
}
