import React from "react";

interface Props {
  name: string;
  text: string;
  time: string;
  selected: boolean;
}

const MessageItem: React.FC<Props> = ({ name, text, time, selected }) => {
  return (
    <div
      className={`p-3 rounded-xl cursor-pointer mb-2 flex items-center gap-3 ${
        selected ? "bg-blue-600 text-white" : "bg-gray-50"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
        {name.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm truncate">{text}</p>
      </div>

      <p className="text-xs">{time}</p>
    </div>
  );
};

export default MessageItem;
