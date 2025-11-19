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
