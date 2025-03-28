import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AnimatePresence, motion } from "framer-motion";

const trips = [
  { destination: "Rome", date: "01.09.2021 - 05.09.2021", days: 5 },
  { destination: "Paris", date: "10.09.2021 - 15.09.2021", days: 6 },
];

const expensesData = [
  { name: "Transport", value: 60 },
  { name: "Hotel", value: 30 },
  { name: "Other", value: 10 },
];

const COLORS = ["#f87171", "#fbbf24", "#60a5fa"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tripIndex, setTripIndex] = useState(0);
  const [userName, setUserName] = useState("Traveler");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSlideTrip = () => {
    setTripIndex((prev) => (prev + 1) % trips.length);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r p-4 shadow-md flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-red-500 tracking-tight mb-2">Travel Buddy</h1>
          <button className="w-full bg-red-400 hover:bg-red-300 text-white mt-4 py-2 rounded">
            New Trip
          </button>
          <nav className="space-y-2 mt-4">
            {["Home", "All trips", "Travels", "Rooms", "Transport", "Attractions"].map((item) => (
              <a key={item} href="#" className="block px-2 py-1 rounded hover:bg-red-50 text-red-400">
                {item}
              </a>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-500 hover:bg-red-200 mt-6 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-end mb-4 items-center space-x-4">
          <label htmlFor="upload" className="cursor-pointer">
            <div
              className="h-10 w-10 rounded-full border-2 border-red-300 bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : "none" }}
            >
              {!profileImage && (
                <div className="h-full w-full bg-red-200 rounded-full flex items-center justify-center text-sm text-red-600 font-bold">
                  +
                </div>
              )}
            </div>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <span className="font-semibold text-gray-700">{userName}</span>
        </div>

        {/* Trip Banner */}
        <div className="mb-4 p-4 bg-white rounded shadow flex justify-between items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tripIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold">Nearest trip</h2>
              <h1 className="text-3xl font-bold text-red-400">{trips[tripIndex].destination}</h1>
            </motion.div>
          </AnimatePresence>
          <button onClick={handleSlideTrip} className="bg-red-400 hover:bg-red-300 text-white px-4 py-2 rounded">
            →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <p>Travel Date: {trips[tripIndex].date}</p>
            <p>{trips[tripIndex].days} days</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p>People: 2 adults</p>
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-red-200 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-red-300 border-2 border-white"></div>
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p>Destination: {trips[tripIndex].destination}, Italy 🇮🇹</p>
            <p>2h 25min flight</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="mb-2">Expenses</p>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={expensesData}
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* To-do List */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">To-do’s</h2>
          <ul className="space-y-2">
            {[
              { task: "Elit est nibh cras phasellus scelerisque orci", priority: "Medium" },
              { task: "Urna nibh eget facilisis egestas mi", priority: "Low" },
              { task: "Enim tincidunt orci curabitur habitant", priority: "Medium" },
              { task: "Sed condimentum magnisi dui bibendum", priority: "High" },
            ].map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded shadow">
                <span>{item.task}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  item.priority === 'High' ? 'bg-red-200' : item.priority === 'Medium' ? 'bg-yellow-200' : 'bg-green-200'
                }`}>
                  {item.priority}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-4 bg-red-400 hover:bg-red-300 text-white px-4 py-2 rounded">Add new task</button>
        </div>
      </main>
    </div>
  );
}
