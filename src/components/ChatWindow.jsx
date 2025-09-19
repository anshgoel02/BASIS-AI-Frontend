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

// import Message from "./Message";

// export default function ChatWindow() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 bg-white">
//         <h2 className="font-semibold text-lg">Chat with Bot</h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//         <Message text="Hello, how can I help?" sender="bot" time="14/09 17:30" />
//         <Message text="Give me SAP t-codes for user lock" sender="user" time="14/09 17:31" />
//       </div>

//       {/* Input Box */}
//       <div className="p-4 border-t border-gray-200 flex items-center bg-white">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none"
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
//       </div>
//     </div>
//   );
// }
