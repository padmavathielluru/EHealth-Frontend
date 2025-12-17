import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectConversation } from "../../store/inboxSlice";
import MessageItem from "./MessageItem";

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: RootState) => state.inbox.conversations
  );
  const selectedId = useSelector(
    (state: RootState) => state.inbox.selectedConversationId
  );

  const selectedTab = useSelector(
    (state: RootState)=>state.inbox.selectedTab
  );

  return (
    <div>
      <input
        className="w-full p-2 rounded-lg bg-gray-100 mb-4 outline-none"
        placeholder="Search"
      />

      {conversations.map((c) => (
        <div key={c.id} onClick={() => dispatch(selectConversation(c.id))}>
          {c.type === selectedTab&&<MessageItem
            name={c.name}
            text={c.latest}
            time={c.time}
            selected={c.id === selectedId}
          />}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
