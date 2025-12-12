import { Responsibilities } from "../interfaces/responsibilitiesTabInterface";
// import { Responsibilities } from "../interfaces/responsibilitiesTabInterface";
import { DEFAULT_Responsibilities } from "../utils/ResponsibilitiesTabConstants";

export const responsibilitiesTabService = {
    getStudies: async (): Promise<Responsibilities[]> => {
        // Replace API later
        return DEFAULT_Responsibilities;
    },

    addStudy: async (study: Responsibilities): Promise<Responsibilities> => {
        return study; // replace with real API
    },

    updateStudy: async (id: number, study: Responsibilities): Promise<Responsibilities> => {
        return study; // replace with real API
    },

    deleteStudy: async (id: number): Promise<boolean> => {
        return true; // replace with real API
    },
};
