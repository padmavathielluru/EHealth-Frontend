import { AwardItem } from "../interfaces/awardsListInterface";
import { AWARDS_LIST } from "../utils/AwardsListConstants";

export const awardsListService = {
    getAwards: async () : Promise<AwardItem[]> => {
        return new Promise((resolve) =>
        setTimeout(() => resolve(AWARDS_LIST), 300)
    );
    },
};