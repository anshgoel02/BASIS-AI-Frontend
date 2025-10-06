// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";
// import ChatInput from "./components/ChatInput.jsx";
// import HomePage from "./components/HomePage.jsx";
// import AppChatsPage from "./pages/AppChatsPage.jsx";
// import api from "./api.js";

// const App = () => {
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);

//   // Load all chats on first render
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await api.get("/chats");
//         setChats(res.data);
//         // if(res.data.length > 0) setActiveChat(res.data[0]); // select first chat by default
//       }
//       catch (err) {
//         console.error("Error fetching chats: ",err);
//       }
//     };

//     fetchChats();
//   }, []);

//   // Create a new chat
//   const handleNewChat = async () => {
//     try {
//       const res = await api.post("/chats", {});
//       setChats((prev) => [...prev, res.data]);
//       setActiveChat(res.data);
//     } catch (err) {
//       console.error("Error creating chat:", err);
//     }
//   };

//   // Rename a chat
//   const handleRenameChat = async (id, newTitle) => {
//     try {
//       const res = await api.put(`/chats/${id}`, {
//         title: newTitle,
//       });
//       setChats((prev) =>
//         prev.map((c) => (c._id === id ? { ...c, title: res.data.title } : c))
//       );
//       if (activeChat?._id === id) {
//         setActiveChat((prev) => ({ ...prev, title: res.data.title }));
//       }
//     } catch (err) {
//       console.error("Error renaming chat:", err);
//     }
//   };

//   // Delete a chat
//   const handleDeleteChat = async (id) => {
//     try {
//       await api.delete(`/chats/${id}`);
//       const updatedChats = chats.filter(c => c._id !== id);
//       setChats(updatedChats);
      
//       if (activeChat?._id === id) {
//         setActiveChat(updatedChats[0] || null);
//       }
//     } catch (err) {
//       console.error("Error deleting chat:", err);
//     }
//   };

//   const deleteMessage = async (msgIndex) => {
//     if(!activeChat) return;

//     try {
//       await api.delete(`/chats/${activeChat._id}/messages/${msgIndex}`);
//       setActiveChat(prev => ({
//         ...prev,
//         messages: prev.messages.filter((_,i) => i !== msgIndex),
//       }));
//       setChats(prev => prev.map(c => c._id === activeChat._id ? {...c,
//         messages: c.messages.filter((_,i) => i !== msgIndex)} : c));
//     }
//     catch (err) {
//       console.error(err);
//     }
//   };


//   // Send a message
//   const handleSend = async (text) => {
//     if (!text.trim() || !activeChat) return;

//     try {
//       // Post user message
//       await api.post(
//         `/chats/${activeChat._id}/messages`,
//         { sender: "user", text }
//       );

//       // Refresh active chat
//       const res = await api.get(
//         `/chats/${activeChat._id}`
//       );
//       setActiveChat(res.data);

//       // Mock bot reply
//       setTimeout(async () => {
//         await api.post(
//           `/chats/${activeChat._id}/messages`,
//           { sender: "bot", text: `You said: ${text}` }
//         );
//         const res2 = await api.get(
//           `/chats/${activeChat._id}`
//         );
//         setActiveChat(res2.data);
//       }, 800);
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar
//           chats={chats}
//           activeChatId={activeChat?._id}
//           onNewChat={handleNewChat}
//           onSelectChat={setActiveChat}
//           onRenameChat={handleRenameChat}
//           onDeleteChat={handleDeleteChat}
//         />
//         <div className="flex flex-col flex-1">
//           <Routes>
//               {/* ✅ Home route */}
//               <Route path="/" element={<HomePage />} />

//               {/* ✅ Chat route */}
//               <Route
//                 path="/chat/:id"
//                 element={
//                   activeChat ? (
//                     <>
//                       <ChatWindow
//                         messages={activeChat?.messages || []}
//                         onDeleteMessage={deleteMessage}
//                       />
//                       <ChatInput onSend={handleSend} />
//                     </>
//                   ) : (
//                     <div className="flex items-center justify-center flex-1 text-gray-500">
//                       Select or create a chat
//                     </div>
//                   )
//                 }
//               />
//             </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import AppChatsPage from "./pages/AppChatsPage.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Routes>
          {/* ✅ Home Page with app cards */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ Per-app chat layout */}
          <Route path="/app/:appName" element={<AppChatsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
