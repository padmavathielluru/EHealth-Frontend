import { Study } from "../interfaces/studiesTabInterface";
import { DEFAULT_STUDIES } from "../utils/StudiesTabConstants";

export const studiesTabService = {
    getStudies: async (): Promise<Study[]> => {
        // Replace API later
        return DEFAULT_STUDIES;
    },

    addStudy: async (study: Study): Promise<Study> => {
        return study; // replace with real API
    },

    updateStudy: async (id: number, study: Study): Promise<Study> => {
        return study; // replace with real API
    },

    deleteStudy: async (id: number): Promise<boolean> => {
        return true; // replace with real API
    },
};
