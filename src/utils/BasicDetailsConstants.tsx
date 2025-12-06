import { BasicDetails } from "../interfaces/basicDetailsTabInterface";

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+971"];

export const QUALIFICATION_OPTIONS = [
    "MBBS",
    "MBBS, MD",
    "MD",
    "MS",
    "BAMS",
];

export const SPECIALIZATION_OPTIONS = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
];

export const basicDetailsConstants: BasicDetails = {
  firstName: "David",
  lastName: "John",
  profileImage: "/images/Ellipse 1.png",
  gender: "Male",
  countryCode: "+91",
  phone: "9895082028",
  address: "58, Islampura Street, Near Alankar Talkies, Girgaon Mumbai, Maharastra",
  qualifications: "MBBS, MD",
  specialization: "Cardiology",
  yearsOfExperience: "number",
  hospitalAffiliation: "Apollo Hospitals",
  languages: "English, Hindi",
};