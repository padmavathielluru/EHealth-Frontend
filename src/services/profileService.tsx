import { Profile } from "../interfaces/profileInterface";
import { ProfileConstants } from "../utils/ProfileConstants";

export const profileService = {

    getProfile(): Promise<Profile> {
        return new Promise((reslove) =>{
            setTimeout(() => {
                reslove(ProfileConstants);
            }, 300);
        });
    },
};