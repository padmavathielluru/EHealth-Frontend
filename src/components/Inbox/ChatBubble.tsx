import React from "react";

interface Props {
  text: string;
  isSender?: boolean;
}

const ChatBubble: React.FC<Props> = ({ text, isSender }) => {
  return (
    <div className={`flex mb-4 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-lg ${
          isSender ? "bg-blue-100" : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
