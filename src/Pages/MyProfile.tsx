import React, { useEffect, useState } from "react";
import ProfileIdCard from "../components/myProfileComponents/ProfileIdCard";
import ProfileStates from "../components/myProfileComponents/ProfileStates";
import { profileService } from "../services/profileService";
import { Profile } from "../interfaces/profileInterface";
import ProfileTabs from "../components/myProfileComponents/MyProfileTabs";

const MyProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        profileService.getProfile().then((data) => setProfile(data));
    }, []);

    if (!profile) return <p>Loading...</p>;

    return(
        <div className=" flex gap-6">
            <div className="w-80 flex flex-col gap-0.5">
            <ProfileIdCard data={profile} />
            <ProfileStates />
            </div>

            <div className="flex-1 ">
                <ProfileTabs />
            </div>
        </div>
    );
};

export default MyProfile;