import React from "react";


export default function Message({ text, sender, timestamp, onDoubleClick }) {
  const [shaking, setShaking] = React.useState(false);
  const isUser = sender === "user";
  let displayTime = "";

  const handleDoubleClick = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      onDoubleClick(); // actually delete after animation
    }, 300); // match animation duration
  };

  if (timestamp) {
    const [datePart, timePart] = timestamp.split(" "); // ["14-9-2025" "17:11:34"]
    const [day, month, year] = datePart.split("-");   // ["14","9","2025"]
    const [hour, minute] = timePart.split(":");       // ["17","11","34"]
    displayTime = `${day}/${month} ${hour}:${minute}`; // "14/9 17:11"
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm transition-transform ${
          shaking ? "animate-shake" : ""
        }  ${
          isUser
            ? "bg-green-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p>{text}</p>
        <span className="block text-[10px] mt-1 text-right">
          {displayTime}
        </span>
      </div>
    </div>
  );
}