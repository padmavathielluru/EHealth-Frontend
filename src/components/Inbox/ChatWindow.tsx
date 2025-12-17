import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectConversation,sendMessage } from "../../store/inboxSlice";
import ChatBubble from "./ChatBubble";

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const conversation = useSelector((state: RootState) =>
    state.inbox.conversations.find(
      (c) => c.id === state.inbox.selectedConversationId
    )
  );

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(sendMessage(input));
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2">
        {conversation?.messages?.map((m) => (
          <ChatBubble key={m.id} text={m.text} isSender={m.sender === "me"} />
        ))}
      </div>

      <div className="p-3 border-t flex items-center gap-3">
        <input
          className="flex-1 p-3 bg-gray-100 rounded-xl outline-none"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="p-3 bg-blue-600 text-white rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
