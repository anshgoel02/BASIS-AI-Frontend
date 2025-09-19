import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatInput from "../components/ChatInput.jsx";

/**
 * AppLayout - presentational layout component.
 * Receives messages, loading and onSend from App and wires them to children.
 */
const AppLayout = ({ messages = [], loading = false, onSend }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading messages...
          </div>
        ) : (
          <>
            <div className="flex-1">
              <ChatWindow messages={messages} />
            </div>

            <div className="border-t bg-white">
              <ChatInput onSend={onSend} />
            </div>
          </>
        )}
      </main>

      {/* Optional right panel placeholder (keep for future features) */}
      {/* <aside className="w-72 hidden lg:block border-l bg-white">
        <div className="p-4 text-sm text-gray-600">Details / Metadata</div>
      </aside> */}
    </div>
  );
};

export default AppLayout;
