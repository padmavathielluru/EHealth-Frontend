

import { createSlice } from "@reduxjs/toolkit";
import { PATIENTS } from "../utils/PatientTableConstants";
import { patientInterface } from "../interfaces/patientInterface";
import { getPatientsByType } from "../services/patientService";


interface PatientState {
  allPatients: patientInterface[];
  filtered: patientInterface[];
  activeTab: "all" | "active" | "inactive" | "new";
  counts: {
    all: number;
    active: number;
    inactive: number;
    new: number;
  };
}

const initialState: PatientState = {
  allPatients: PATIENTS,
  filtered: PATIENTS,
  activeTab: "all",
  counts: {
    all: PATIENTS.length,
    active: PATIENTS.filter((p) => p.status === "ACTIVE").length,
    inactive: PATIENTS.filter((p) => p.status === "INACTIVE").length,
    new: PATIENTS.filter((p) => p.status === "NEW").length,
  },
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
   setTab(state, action) {
  state.activeTab = action.payload;
  state.filtered = getPatientsByType(action.payload, state.allPatients);
    },
  },
});

export const { setTab } = patientSlice.actions;
export default patientSlice.reducer;
