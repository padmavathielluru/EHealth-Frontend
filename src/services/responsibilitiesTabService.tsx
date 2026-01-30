import { Responsibilities } from "../interfaces/responsibilitiesTabInterface";
import { DEFAULT_Responsibilities } from "../utils/ResponsibilitiesTabConstants";

export const responsibilitiesTabService = {
    getStudies: async (): Promise<Responsibilities[]> => {
        return DEFAULT_Responsibilities;
    },

    addStudy: async (study: Responsibilities): Promise<Responsibilities> => {
        return study; 
    },

    updateStudy: async (id: number, study: Responsibilities): Promise<Responsibilities> => {
        return study; 
    },

    deleteStudy: async (id: number): Promise<boolean> => {
        return true; 
    },
};
