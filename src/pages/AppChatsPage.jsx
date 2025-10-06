import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatInput from "../components/ChatInput.jsx";
import api from "../api.js";

const AppChatsPage = () => {
  const { appName } = useParams();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // ✅ Fetch all chats for this app
  useEffect(() => {
    const fetchAppChats = async () => {
      try {
        const res = await api.get(`/chats/app/${appName}`);
        setChats(res.data);
        setActiveChat(res.data[0] || null);
        // console.log(res.data);
        // console.log(res.data[0]);
        // console.log("Active chat", activeChat);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };
    fetchAppChats();
  }, [appName]);

  // ✅ Create a new chat
  const handleNewChat = async () => {
    try {
      const res = await api.post("/chats", { appName });
      setChats((prev) => [...prev, res.data]);
      setActiveChat(res.data);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // ✅ Rename chat
  const handleRenameChat = async (id, newTitle) => {
    try {
      const res = await api.put(`/chats/${id}`, { title: newTitle });
      setChats((prev) =>
        prev.map((c) => (c._id === id ? { ...c, title: res.data.title } : c))
      );
      if (activeChat?._id === id) {
        setActiveChat((prev) => ({ ...prev, title: res.data.title }));
      }
    } catch (err) {
      console.error("Error renaming chat:", err);
    }
  };

  // ✅ Delete chat
  const handleDeleteChat = async (id) => {
    try {
      await api.delete(`/chats/${id}`);
      const updatedChats = chats.filter((c) => c._id !== id);
      setChats(updatedChats);
      if (activeChat?._id === id) {
        setActiveChat(updatedChats[0] || null);
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  // ✅ Delete message
  const deleteMessage = async (msgIndex) => {
    if (!activeChat) return;
    try {
      await api.delete(`/chats/${activeChat._id}/messages/${msgIndex}`);
      setActiveChat((prev) => ({
        ...prev,
        messages: prev.messages.filter((_, i) => i !== msgIndex),
      }));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // ✅ Send message
  const handleSend = async (text) => {
    if (!text.trim() || !activeChat) return;

    try {
      await api.post(`/chats/${activeChat._id}/messages`, {
        sender: "user",
        text,
      });

      const res = await api.get(`/chats/${activeChat._id}`);
      setActiveChat(res.data);

      // Mock bot reply
      setTimeout(async () => {
        await api.post(`/chats/${activeChat._id}/messages`, {
          sender: "bot",
          text: `You said: ${text}`,
        });
        const res2 = await api.get(`/chats/${activeChat._id}`);
        setActiveChat(res2.data);
      }, 800);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-1 h-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChat?._id}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        appName={appName}
      />
      <div className="flex flex-col flex-1">
        {activeChat ? (
          <>
            <ChatWindow
              messages={activeChat.messages || []}
              onDeleteMessage={deleteMessage}
            />
            <ChatInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select or create a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default AppChatsPage;
