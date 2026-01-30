export interface Practice {
  practiceType: string;
  clinicName: string;
  location: string;
}

export interface ProfessionalDetailsFormValues {
  degree?: string;
  specialization: string;
  experience: string;
  council: string;
  license: string;
  practices: Practice[];
}
