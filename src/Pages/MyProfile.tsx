import React, { useEffect, useState } from "react";
import ProfileIdCard from "../components/myProfileComponents/ProfileIdCard";
import ProfileStates from "../components/myProfileComponents/ProfileStates";
import { profileService } from "../services/profileService";
import { Profile } from "../interfaces/profileInterface";
import ProfileTabs from "../components/myProfileComponents/MyProfileTabs";
import ReviewsList from "../components/myProfileComponents/ReviewsList";
import AwardsList from "../components/myProfileComponents/AwardsList";
import PublicationsList from "../components/myProfileComponents/PublicationsList";

const MyProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [activeContent, setActiveContent] = useState("Basic Details");
    const [showReviews, setShowReviews] = useState(false);
    const [activeCard, setActiveCard] = useState("");
    const [showAwards, setShowAwards] = useState(false);
    const [showPublications, setShowPublications] = useState(false);

    useEffect(() => {
        profileService.getProfile().then((data) => setProfile(data));
    }, []);

    if (!profile) return <p>Loading...</p>;

    return(
        <div className=" flex gap-6">
            <div className="w-80 flex flex-col gap-0.5">
            <ProfileIdCard data={profile} />
            <ProfileStates 
            activeCard={activeCard}
            onCardClick={(title: string) => {
                setActiveCard(title);

                if (title.toLowerCase().includes( "reviews")) {
                    setShowReviews(true);
                    setShowAwards(false);
                    setActiveContent("");
                    return;
                } 
                if (title.toLowerCase().includes("awards")) {
                    setShowAwards(true);
                    setShowReviews(false);
                    setActiveContent("");
                    return;
                }
                if (title.toLowerCase().includes("publications")) {
                    setShowPublications(true);
                    setShowReviews(false);
                    setShowAwards(false);
                    setActiveContent("");
                    return;
                }
                setShowReviews(false);
                setShowAwards(false);
                setShowPublications(false);
                setActiveContent(title);
            }}/>
            </div>

            <div className="flex-1 select-none">
                {/* {renderContent()} */}
                <ProfileTabs 
                 activeTab={activeContent}
                 externalContent={showReviews ? <ReviewsList /> :
                                showAwards ? <AwardsList />: 
                                showPublications ? <PublicationsList /> : null }
                 onTabChange={(tab) => {
                    setActiveContent(tab);
                    setShowReviews(false);
                    setShowAwards(false);
                    setShowPublications(false);
                    setActiveCard(tab);
                 }}
                 />
            </div>
        </div>
    );
};

export default MyProfile;