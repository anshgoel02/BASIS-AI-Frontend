import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const Sidebar = ({ chats, activeChatId, onNewChat, onSelectChat, onRenameChat, onDeleteChat }) => {
  const [renamingChatId, setRenamingChatId] = useState(null);
  const [tempName, setTempName] = useState("");

  const handleRenameSubmit = (id) => {
    if (tempName.trim()) {
      onRenameChat(id, tempName.trim());
    }
    setRenamingChatId(null);
    setTempName("");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">SAP BASIS Bot</h1>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded mb-4"
      >
        + New Chat
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.length === 0 ? (
          <p className="text-gray-400">No chats yet</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                activeChatId === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {renamingChatId === chat.id ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => handleRenameSubmit(chat.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleRenameSubmit(chat.id) : null
                  }
                  autoFocus
                  className="flex-1 bg-gray-800 text-white px-2 py-1 rounded"
                />
              ) : (
                <div
                  className="flex-1 truncate"
                  onClick={() => onSelectChat(chat)}
                >
                  {chat.title}
                </div>
              )}

              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => {
                    setRenamingChatId(chat.id);
                    setTempName(chat.title);
                  }}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDeleteChat(chat.id)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
