import { Study } from "../interfaces/studiesTabInterface";
import { DEFAULT_STUDIES } from "../utils/StudiesTabConstants";

export const studiesTabService = {
    getStudies: async (): Promise<Study[]> => {
        return DEFAULT_STUDIES;
    },

    addStudy: async (study: Study): Promise<Study> => {
        return study; 
    },

    updateStudy: async (id: number, study: Study): Promise<Study> => {
        return study;
    },

    deleteStudy: async (id: number): Promise<boolean> => {
        return true; 
    },
};
