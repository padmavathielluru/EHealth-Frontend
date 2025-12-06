import { profileStatesData } from "../utils/ProfileStatesConstants";
import { ProfileStateItem } from "../interfaces/profileStatesInterface";

export const profileStatesService = {
    getProfileStates() : Promise<ProfileStateItem[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(profileStatesData);
            }, 300);
        });
    },
};