import React, { useEffect, useState } from "react";
import InboxTabs from "../components/Inbox/InboxTabs";
import MessageList from "../components/Inbox/MessageList";
import ChatWindow from "../components/Inbox/ChatWindow";
import MyProfile from "./MyProfile";
import ProfileIdCard from "../components/myProfileComponents/ProfileIdCard";
import { Profile } from "../interfaces/profileInterface";
import { profileService } from "../services/profileService";
import ProfileStates from "../components/myProfileComponents/ProfileStates";
// import ProfileSidebar from "../components/Inbox/ProfileSidebar";

const InboxComponent: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeCard, setActiveCard] = useState("");
  const [activeContent, setActiveContent] = useState("Basic Details");
  const [showAwards, setShowAwards] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  useEffect(() => {
    profileService.getProfile().then((data) => setProfile(data));
  }, []);

  if (!profile) return <p>Loading...</p>;
  return (
    <div className="p-6 flex flex-col flex-1 overflow-hidden">
      <InboxTabs />

      <div className="flex bg-white shadow rounded-xl mt-4 overflow-hidden flex-1">

        {/* LEFT: Message List */}
        <div className="w-1/3 border-r p-4 overflow-y-auto">
          <MessageList />
        </div>

        {/* MIDDLE: Chat */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ChatWindow />
        </div>

        {/* RIGHT: Profile */}

        <div className="w-1/4 border-l p-4 bg-gray-50 overflow-y-auto">
          <ProfileIdCard data={profile} />
          <ProfileStates
            activeCard={activeCard}
            onCardClick={(title: string) => {
              setActiveCard(title);

              if (title.toLowerCase().includes("reviews")) {
                setShowReviews(true);
                setShowAwards(false);
                setActiveContent("");
                return;
              }
            }} />
        </div>


      </div>
    </div>
  );
};

export default InboxComponent;
