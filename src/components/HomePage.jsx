/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#EF4444", "#FACC15", "#3B82F6"]; // red, yellow, blue

const cockpitLinks = {
  "SAP Integration Suite":
    "https://cockpit.eu10.hana.ondemand.com/cockpit#/globalaccount/your-global-account/subaccount/your-subaccount/applications/integration-suite",
  "SAP BTP":
    "https://cockpit.eu10.hana.ondemand.com/cockpit#/globalaccount/your-global-account",
  "SAP Signavio":
    "https://portal.signavio.com/p/login",
  "SAP Analytics Cloud":
    "https://eu10.sapanalytics.cloud",
};
  
const loginLinks = {
  "SAP Integration Suite": "https://integration.eu10.cloud.sap",
  "SAP BTP": "https://account.hanatrial.ondemand.com/",
  "SAP Signavio": "https://portal.signavio.com/p/login",
  "SAP Analytics Cloud": "https://eu10.sapanalytics.cloud/sap/fpa/ui/",
};


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
          critical: app.critical || 2,
          warning: app.warning || 4,
          info: app.info || 7,
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
  
  const getStatusColor = (count) => {
    if (count === 0) return "bg-green-100 text-green-700";
    if (count < 3) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };
    
  const getStatusText = (count) => {
    if (count === 0) return "Healthy";
    if (count < 3) return "Warning";
    return "Critical";
  };

    
  if (loading) return <div className="p-8 text-gray-500">Loading apps...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col p-8 w-full h-full">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-6">McCain Cloud Application Dashboard</h1>

        {/* Grid of Apps */}
        <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto">
            {apps.map((app) => {
                const data = [
                    { name: "Critical", value: app.critical },
                    { name: "Warning", value: app.warning },
                    { name: "Info", value: app.info },
                ];

                const cockpitUrl = cockpitLinks[app.name] || "#";
                const loginUrl = loginLinks[app.name] || "#";

                return (
                    <div
                        key={app._id || app.name}
                        onClick={() => navigate(`/app/${app.name}`)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 cursor-pointer transition flex flex-col justify-between"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xl font-semibold">
                                {app.display || app.name}
                            </h2>
                            <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.notifications)}`}
                            >
                            {getStatusText(app.notifications)}
                            </div>
                        </div>

                        {/* Content Section: Left (counts) + Right (chart) */}
                        <div className="flex items-center justify-between">
                            {/* Left Side - Counts */}
                            <div className="flex flex-col gap-1 text-gray-700">
                            <p className="flex gap-2 text-sm">
                            <a
                                href={cockpitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-600 hover:underline"
                                >
                                Cockpit
                                </a>
                                <span className="text-gray-400">|</span>
                                <a
                                href={loginUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-600 hover:underline"
                                >
                                Login
                                </a>
                            </p>
                            <p>
                                <span className="font-medium text-red-600">Critical:</span>{" "}
                                {app.critical}
                            </p>
                            <p>
                                <span className="font-medium text-yellow-600">Warning:</span>{" "}
                                {app.warning}
                            </p>
                            <p>
                                <span className="font-medium text-blue-600">Info:</span>{" "}
                                {app.info}
                            </p>
                            </div>

                            {/* Right Side - Pie Chart */}
                            <div className="w-32 h-32">
                            <PieChart width={130} height={130}>
                                <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                innerRadius={25}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                labelLine={false}
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            </div>
                        </div>

                        {/* Pie Chart
                        <div className="flex justify-center my-4">
                            <ResponsiveContainer width="60%" height={100}>
                            <PieChart>
                                <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={25}
                                outerRadius={40}
                                paddingAngle={3}
                                >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            </ResponsiveContainer>
                        </div> */}

                        {/* <p className="text-gray-600">SAP Notifications: {app.notifications}</p> */}
                        <p className="text-gray-600">Last Updated: {app.lastUpdated}</p>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default HomePage;
