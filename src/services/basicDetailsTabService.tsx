import { BasicDetails } from "../interfaces/basicDetailsTabInterface";
import { basicDetailsConstants } from "../utils/BasicDetailsConstants";

export const basicDetailsTabService = {
  getBasicDetails: async (): Promise<BasicDetails> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(basicDetailsConstants), 500)
    );
  },
};

export {}; 
