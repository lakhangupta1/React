import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { users } = useSelector((state) => state.users);

  const menuItems = [
    { id: 1, label: "Dashboard", path: "/dashboard", icon: "📊" },
    { id: 2, label: "Users", path: "/users", icon: "👥" },
    { id: 5, label: "Shop", path: "/shop", icon: "🛍️" },
    { id: 3, label: "Reports", path: "/reports", icon: "📈" },
    { id: 4, label: "Settings", path: "/settings", icon: "⚙️" },
    { id: 6, label: "Cart", path: "/cart", icon: "🛒" },
    { id: 7, label: "Admin Products", path: "/admin/products", icon: "🛠️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 dark:bg-black text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 dark:border-gray-800">
          {isOpen && <h1 className="text-xl font-bold">MyApp</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded transition-all"
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>

        {/* Statistics */}
        {isOpen && (
          <div className="p-4 border-b border-gray-700 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-3">STATISTICS</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 dark:text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-blue-400 dark:text-blue-400">{users.length}</p>
              </div>
              <div className="bg-gray-800 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 dark:text-gray-500">Active Today</p>
                <p className="text-2xl font-bold text-green-400 dark:text-green-400">
                  {Math.floor(users.length * 0.7)}
                </p>
              </div>
              <div className="bg-gray-800 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 dark:text-gray-500">New Users</p>
                <p className="text-2xl font-bold text-purple-400 dark:text-purple-400">
                  {Math.floor(users.length * 0.2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <div className={isOpen ? "space-y-2" : "space-y-4"}>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-blue-600 dark:bg-blue-700 text-white"
                    : "text-gray-300 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-800"
                }`}
                title={!isOpen ? item.label : ""}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-700 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">© 2025 MyApp</p>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-1">v1.0.0</p>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
