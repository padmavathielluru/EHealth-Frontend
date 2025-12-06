export interface Symptom {
  symptomId: string;
  appointmentId: string;
  symptomName: string;
  severity: "MILD" | "MODERATE" | "SEVERE";
  note?: string;
  createdTime: string;
  description?: string;
}

export interface Diagnosis {
  diagnosisId: string;
  appointmentId: string;
  diagnosisName: string;
  note: string;
  createdTime: string;
  description?: string;
}

export interface Prescription {
  prescriptionId: string;
  diagnosisId: string;
  appointmentId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  duration: string;
  dosageTime: string[];
  note: string;
  instructions?: string;
  description?:string;
}

export interface Referral {
  appointReferralId: string;
  appointmentId: string;
  diagnosisId: string;
  referralId: string;
  referralName: string;
  note: string;
  referralType?: string;
  category?: string;
  date?: string;
  status?: string;
}

export interface LabTest {
  labTestId: string;
  appointmentId: string;
  referralId: string;
  referralName: string;
  note: string;
}

export interface NoteItem {
  noteId: string;
  appointmentId: string;
  comment: string;
}

export interface AppointmentBlock {
  userId: string;
  hostId: string;
  symptoms: Symptom[];
  diagnosis: Diagnosis[];
  prescriptions: Prescription[];
  referrals: Referral[];
  labTests: LabTest[];
  notes: NoteItem[];
}

export interface HistoryItem {
  id: string;           
  date: string;
  appointments: AppointmentBlock[];

  // symptoms: Symptom[];
  // diagnosis: Diagnosis[];
  // prescriptions: Prescription[];
  // referrals: Referral[];
  // labTests: LabTest[];
  // notes: NoteItem[];
}
