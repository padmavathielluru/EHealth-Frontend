import { RootState } from "../store";

export const selectPatientCounts = (state: RootState) => {
  const patients = state.patients.filtered;

  const total = patients.length;
  const newPatients = patients.filter(p => p.status === "NEW").length;
  const activePatients = patients.filter(p => p.status === "ACTIVE").length;
  const inactivePatients = patients.filter(p => p.status === "INACTIVE").length;

  return {
    total,
    newPatients,
    activePatients,
    inactivePatients,
  };
};
