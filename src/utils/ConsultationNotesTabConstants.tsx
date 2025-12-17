import { HistoryItem } from "../interfaces/consultationNotesTabInterface";

export const SEVERITY_CONFIG: Record<string, { dot:string; badge: string }> = {
  SEVERE: { dot: "bg-red-500", badge: "bg-red-100 text-red-600",},
  MEDIUM: { dot: "bg-orange-500", badge: "bg-orange-100 text-orange-600",},
  MILD: { dot: "bg-yellow-500", badge:"bg-yellow-100 text-yellow-600",},
};

// export const SEVERITY_CONFIG = {
//   SEVERE: { bg: "red", text: "white", dot: "red", badge: "red" },
//   MEDIUM: { bg: "orange", text: "black", dot: "orange", badge: "orange" },
//   MILD: { bg: "green", text: "white", dot: "green", badge: "green" },
// };


export const SOAP_SECTIONS = [
  { key: "subjective", label: "SUBJECTIVE" },
  { key: "objective", label: "OBJECTIVE" },
  { key: "assessment", label: "ASSESSMENT" },
  { key: "plan", label: "PLAN" },
];

export const DIAGNOSIS_STATUS_CONFIG: Record< "SUSPECTED" | "CONFIRMED",string> = {
  SUSPECTED: "bg-gray-100 text-gray-500",
  CONFIRMED: "bg-gray-100 text-green-600",
};

export const PRESCRIPTION_TABLE_HEADERS = [
  "Medication Name",
  "Dosage",
  "Frequency",
  "Time",
  "Route",
  "Start Date",
  "Duration",
];

export const historyData: HistoryItem[] = [
  {
    cid: "CID158057",
    date: "27/11/2025 03:35 PM",
    appointments: [
      {
        subjective: "Patient complains of fever and dry cough",
        objective: "---",
        assessment: "Viral URTI suspected",
        plan: "Paracetamol; CBC; Follow-up in 3 days",
        symptoms: [
          {symptomName: "Headache",severity: "SEVERE",description: "Started 2 days back from the consultation date", },
          {symptomName: "Fever",severity: "SEVERE", description: "Started same day of the consultation date",},
          {symptomName: "Sinusitis", severity: "MEDIUM", description: "Started 1 day back from the consultation date",},
        ],
        diagnosis: [
          { name: "Viral URTI",status: "SUSPECTED",description: "dolor sit amet, consectetur adipiscing elit, Fusce cursus, quam nec fermentum pretium",
          labTests: [
              { testName: "CBC", suggestedLab:"DDRC, Bangalore",},
              {testName:"CRP", suggestedLab:"DDRC, Bangalore", },
            ],
          referrals: [
              {doctorName:"Dr. John Smith",specialization: "CARDIOLOGIST",
                notes: `Consectetur adipiscing elit.Fusce cursus, quam nec fermentum pretium Consectetur adipiscing elit.Fusce cursus, quam 
                 adipiscing elit. Fusce cursus, quam nec fermentum pretium dolor sit amet, consectetur adipiscing elit. Fusce cursus`, },
            ],
          },
        ],
        prescriptions: [
          { medicationName: "Paracetamol", dosage: "650 mg", frequency: "1-0-1", time: "AF", route:"Intake", startDate:"08/12/2025", duration: "5 Days",},
          { medicationName: "Cough Syrup", dosage: "5 ml", frequency: "1-1-1", time: "AF", route:"Intake", startDate:"08/12/2025", duration: "5 Days",},
          { medicationName: "Dolo", dosage: "650 mg", frequency: "0-0-1", time: "BF", route:"Intake", startDate:"08/12/2025", duration: "5 Days",},
        ],
        prescriptionReferral: {
          description:`Consectetur adipiscing elit. Fusce cursus, quam nec fermentum pretium dolor sit amet, consectetur adipiscing elit. Fusce cursus.
           adipiscing elit. Fusce cursus, quam nec fermentum pretium dolor sit amet, consectetur adipiscing elit. Fusce cursus`},
          suggestedPharmacy:{
            name:"Metro Medicals",location:"Bangalore",},
        referrals: [],
      },
    ],
  },
];
  