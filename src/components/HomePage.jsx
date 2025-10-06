import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js"; // assuming your api.js has axios instance

const HomePage = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get("/chats/apps-summary"); // new route for aggregated app info
        // Transform API response into frontend-friendly structure
        const formatted = res.data.map((app) => ({
          name: app._id, // appName from backend
          display: app._id, // can add better display names if needed
          notifications: app.totalNotifications,
          lastUpdated: new Date(app.lastUpdated).toLocaleDateString("en-IN"),
        }));
        setApps(formatted);
      } catch (err) {
        console.error("Error fetching apps:", err);
        setError("Failed to load apps");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading apps...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    // <div className="grid grid-cols-2 gap-6 p-8 w-full">
    //   {apps.map((app) => (
    //     <div
    //       key={app.name}
    //       onClick={() => navigate(`/app/${app.name}`)}
    //       className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 cursor-pointer transition"
    //     >
    //       <h2 className="text-xl font-semibold mb-2">{app.display}</h2>
    //       <p className="text-gray-600">SAP Notifications: {app.notifications}</p>
    //       <p className="text-gray-600">Last Updated: {app.lastUpdated}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="flex flex-col p-8 w-full h-full">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Grid of Apps */}
        <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto">
            {apps.map((app) => (
            <div
                key={app._id || app.name}
                onClick={() => navigate(`/app/${app.name}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 cursor-pointer transition flex flex-col justify-between"
            >
                <h2 className="text-xl font-semibold mb-2">{app.display || app.name}</h2>
                <p className="text-gray-600">SAP Notifications: {app.notifications}</p>
                <p className="text-gray-600">Last Updated: {app.lastUpdated}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default HomePage;
