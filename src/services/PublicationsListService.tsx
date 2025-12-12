import { PUBLICATIONS_LIST } from "../utils/PublicationsListConstants";
import { PublicationsItem } from "../interfaces/publicationsListInterface";

export const publicationsListService = {
    getPublications: async (): Promise<PublicationsItem[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(PUBLICATIONS_LIST), 400);
        });
    },
};
