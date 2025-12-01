import { HistoryItem } from "../interfaces/historyInterface";

export const historyData: HistoryItem[] = [
  {
    id: "1",
    date: "27/11/2025 03:35 PM",
    appointments: [
      {
        userId: "U1001",
        hostId: "H2001",
        symptoms: [
          { symptomId: "S1", appointmentId: "A1001", symptomName: "Headache", severity: "MODERATE", 
           description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,

            note: "Fever since 2 days, temperature fluctuating.", createdTime: "2025-11-27T15:00:00" },
          { symptomId: "S2", appointmentId: "A1001", symptomName: "Hypertension", severity: "MILD", 
                       description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Intermittent headache, mainly in the morning.", createdTime: "2025-11-27T15:05:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A1001", diagnosisName: "Conclusion", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Suspected viral fever based on symptoms.", createdTime: "2025-11-27T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A1001", diagnosisName: "Conclusion", 
                       description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Patient advised to increase fluid intake.", createdTime: "2025-11-27T15:12:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D1",
            appointmentId: "A1001",
            medicineName: "Lisinopril",
            dosage: "10 mg",
            frequency: "Twice Daily",
            route: "Oral",
            startDate: "27/08/2025",
            duration: "5 Days",
            dosageTime: ["M", "NYT"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "After food."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D1",
            appointmentId: "A1001",
            medicineName: "Metformin",
            dosage: "5 mg",
            frequency: "Twice Daily",
            route: "Oral",
            startDate: "27/08/2025",
            duration: "5 Days",
            dosageTime: ["M", "NYT"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "After food."
          }
        ],
       

        referrals: [
          { appointReferralId: "R1", appointmentId: "A1001", diagnosisId: "D1", referralId: "RF1001", referralName: "MindWell Therapy", 
            referralType: "Doctor",
            category:"Psychology",
            date:"27/08/2025",
            status:"Unknow",
            note: "Follow-up after 3 days." },
            { appointReferralId: "R1", appointmentId: "A1001", diagnosisId: "D1", referralId: "RF1001", referralName: "LifeCare Pharmacy", 
            referralType: "Pharmacy",
            category:"Pharmacy",
            date:"27/08/2025",
            status:"Unknow",
            note: "Follow-up after 3 days." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A1001", referralId: "RF2001", referralName: "CBC", note: "Check infection markers." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A1001", comment: "Patient stable, advised rest." }
        ]
      }
    ]
  },
  {
    id: "2",
    date: "15/08/2025 03:38 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "3",
    date: "15/08/2025 03:36 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "4",
    date: "15/08/2025 03:37 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "5",
    date: "15/08/2025 03:39 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "6",
    date: "15/08/2025 03:40 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "7",
    date: "15/08/2025 03:41 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "9",
    date: "15/08/2025 03:42 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "2",
    date: "15/08/2025 03:42 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  },
   {
    id: "10",
    date: "15/08/2025 03:44 PM",
    appointments: [
      {
        userId: "U1002",
        hostId: "H2002",
        symptoms: [
          { symptomId: "S1", appointmentId: "A2001", symptomName: "Cough", severity: "SEVERE", 
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Dry cough since 1 week.", createdTime: "2025-08-15T15:00:00" },
          { symptomId: "S2", appointmentId: "A2001", symptomName: "Throat Pain", severity: "MILD", 
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Pain increasing during swallowing.", createdTime: "2025-08-15T15:03:00" }
        ],
        diagnosis: [
          { diagnosisId: "D1", appointmentId: "A2001", diagnosisName: "Acute Pharyngitis",
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Likely due to viral/bacterial infection.", createdTime: "2025-08-15T15:10:00" },
          { diagnosisId: "D2", appointmentId: "A2001", diagnosisName: "Upper Respiratory Tract Infection",
            description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Needs medication and hydration.", createdTime: "2025-08-15T15:13:00" }
        ],
        prescriptions: [
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          },
          {
            prescriptionId: "P1",
            diagnosisId: "D2",
            appointmentId: "A2001",
            medicineName: "Azithromycin 250mg",
            dosage: "250 mg",
            frequency: "Once Daily",
            route: "Oral",
            startDate: "15/08/2025",
            duration: "3 Days",
            dosageTime: ["M"],
             description: `Lorem ipsum, dolor sit amet
                         consectetur adipisicing elit.
                          Tempore officia suscipit doloremque 
                           cum recusandae ipsam aspernatur
                          iusto, nisi animi aliquam, commodi
                         iure molestias sed dignissimos 
                          facilis aut id culpa accusantium.`,
            note: "Complete full course."
          }
        ],
        referrals: [
          { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." },
            { appointReferralId: "R1", appointmentId: "A2001", diagnosisId: "D2", referralId: "RF3001", referralName: "ENT Specialist", 
            referralType:"Doctor",
            category:"ENT",
            date:"15/08/2025",
            status:"Pending",
            note: "If symptoms persist." }
        ],
        labTests: [
          { labTestId: "L1", appointmentId: "A2001", referralId: "RF4001", referralName: "Throat Swab Culture", note: "Check bacterial infection." }
        ],
        notes: [
          { noteId: "N1", appointmentId: "A2001", comment: "Patient advised warm saline gargling." }
        ]
      }
    ]
  }

  
];
