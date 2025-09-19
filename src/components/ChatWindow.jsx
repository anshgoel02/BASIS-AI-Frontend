import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";

const ChatWindow = ({ messages, onDeleteMessage }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg, i) => (
        <Message key={i} onDoubleClick={() => {
          console.log("Deleting message at index", i);
          onDeleteMessage(i);
        }} sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;