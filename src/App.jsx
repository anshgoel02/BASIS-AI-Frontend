// import React, { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";
// import ChatInput from "./components/ChatInput.jsx";
// import axios from "axios";

// const App = () => {
//   const [messages, setMessages] = useState([]);

//   // Fetch messages on load
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/chats")
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error("Error fetching messages:", err));
//   }, []);

//   const handleSend = async (text) => {
//     if (!text.trim()) return;

//     try {
//       // Post user message to backend
//       const { data: userRes } = await axios.post("http://localhost:5000/messages", {
//         sender: "user",
//         text,
//       });

//       setMessages((prev) => [...prev, userRes.message]);

//       // Mock bot reply
//       setTimeout(async () => {
//         const botMessage = {
//           sender: "bot",
//           text: `You said: ${text}`,
//         };

//         const { data: botRes } = await axios.post("http://localhost:5000/messages", botMessage);
//         setMessages((prev) => [...prev, botRes.message]);
//       }, 800);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <ChatWindow messages={messages} />
//         <ChatInput onSend={handleSend} />
//       </div>
//     </div>
//   );
// };

// export default App;







// import React, { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";
// import ChatInput from "./components/ChatInput.jsx";
// import axios from "axios";

// const App = () => {
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);

//   // Load all chats on first render
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/chats")
//       .then((res) => {
//         setChats(res.data);
//         if (res.data.length > 0) setActiveChat(res.data[0]); // select first chat by default
//       })
//       .catch((err) => console.error("Error fetching chats:", err));
//   }, []);

//   // Create a new chat
//   const handleNewChat = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/chats", {});
//       setChats((prev) => [...prev, res.data]);
//       setActiveChat(res.data);
//     } catch (err) {
//       console.error("Error creating chat:", err);
//     }
//   };

//   // Rename a chat
//   const handleRenameChat = async (id, newTitle) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/chats/${id}`, {
//         title: newTitle,
//       });
//       setChats((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, title: res.data.title } : c))
//       );
//       if (activeChat?.id === id) {
//         setActiveChat((prev) => ({ ...prev, title: res.data.title }));
//       }
//     } catch (err) {
//       console.error("Error renaming chat:", err);
//     }
//   };

//   // Send a message
//   const handleSend = async (text) => {
//     if (!text.trim() || !activeChat) return;

//     try {
//       // Post user message
//       await axios.post(
//         `http://localhost:5000/chats/${activeChat.id}/messages`,
//         { sender: "user", text }
//       );

//       // Refresh active chat
//       const res = await axios.get(
//         `http://localhost:5000/chats/${activeChat.id}`
//       );
//       setActiveChat(res.data);

//       // Mock bot reply
//       setTimeout(async () => {
//         await axios.post(
//           `http://localhost:5000/chats/${activeChat.id}/messages`,
//           { sender: "bot", text: `You said: ${text}` }
//         );
//         const res2 = await axios.get(
//           `http://localhost:5000/chats/${activeChat.id}`
//         );
//         setActiveChat(res2.data);
//       }, 800);
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         chats={chats}
//         activeChatId={activeChat?.id}
//         onNewChat={handleNewChat}
//         onSelectChat={(chat) => setActiveChat(chat)}
//         onRenameChat={handleRenameChat}
//       />
//       <div className="flex flex-col flex-1">
//         {activeChat ? (
//           <>
//             <ChatWindow messages={activeChat.messages} />
//             <ChatInput onSend={handleSend} />
//           </>
//         ) : (
//           <div className="flex items-center justify-center flex-1 text-gray-500">
//             Select or create a chat
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import ChatInput from "./components/ChatInput.jsx";
import axios from "axios";

const App = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Load all chats on first render
  useEffect(() => {
    axios
      .get("http://localhost:5000/chats")
      .then((res) => {
        setChats(res.data);
        if (res.data.length > 0) setActiveChat(res.data[0]); // select first chat by default
      })
      .catch((err) => console.error("Error fetching chats:", err));
  }, []);

  // Create a new chat
  const handleNewChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/chats", {});
      setChats((prev) => [...prev, res.data]);
      setActiveChat(res.data);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // Rename a chat
  const handleRenameChat = async (id, newTitle) => {
    try {
      const res = await axios.put(`http://localhost:5000/chats/${id}`, {
        title: newTitle,
      });
      setChats((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title: res.data.title } : c))
      );
      if (activeChat?.id === id) {
        setActiveChat((prev) => ({ ...prev, title: res.data.title }));
      }
    } catch (err) {
      console.error("Error renaming chat:", err);
    }
  };

  // Delete a chat
  const handleDeleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/chats/${id}`);
      setChats((prev) => prev.filter((c) => c.id !== id));
      if (activeChat?.id === id) {
        setActiveChat(chats.length > 1 ? chats[0] : null);
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  const deleteMessage = async (chatId, msgIndex) => {
    // console.log("Deleting message", chatId, msgIndex);
    await fetch(`http://localhost:5000/chats/${chatId}/messages/${msgIndex}`, {
      method: "DELETE",
    });

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: chat.messages.filter((_, i) => i !== msgIndex) }
          : chat
      )
    );

    if (activeChat?.id === chatId) {
      setActiveChat(prev => ({
        ...prev,
        messages: prev.messages.filter((_, i) => i !== msgIndex),
      }));
    }
  };


  // Send a message
  const handleSend = async (text) => {
    if (!text.trim() || !activeChat) return;

    try {
      // Post user message
      await axios.post(
        `http://localhost:5000/chats/${activeChat.id}/messages`,
        { sender: "user", text }
      );

      // Refresh active chat
      const res = await axios.get(
        `http://localhost:5000/chats/${activeChat.id}`
      );
      setActiveChat(res.data);

      // Mock bot reply
      setTimeout(async () => {
        await axios.post(
          `http://localhost:5000/chats/${activeChat.id}/messages`,
          { sender: "bot", text: `You said: ${text}` }
        );
        const res2 = await axios.get(
          `http://localhost:5000/chats/${activeChat.id}`
        );
        setActiveChat(res2.data);
      }, 800);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        chats={chats}
        activeChatId={activeChat?.id}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex flex-col flex-1">
        {activeChat ? (
          <>
            <ChatWindow messages={activeChat?.messages || []}
  onDeleteMessage={(msgIndex) => deleteMessage(activeChat.id, msgIndex)}/>
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

export default App;
