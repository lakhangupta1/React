import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { fetchUsers } from "../users/userSlice";
import { setFavicon } from "../../utils/faviconUtils";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    document.title = "Dashboard - Admin Dashboard";
    setFavicon('/dashboard');
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const stats = {
    totalUsers: users.length,
    activeUsers: Math.floor(users.length * 0.85),
    newUsersThisMonth: Math.floor(users.length * 0.2),
    systemUptime: "99.9%",
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Welcome back, {user?.name || "User"}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your system today</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Total Users</p>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
              <p className="text-green-600 dark:text-green-400 text-xs mt-3">↑ 12% increase this month</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Active Users</p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.activeUsers}</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
              <p className="text-green-600 dark:text-green-400 text-xs mt-3">Currently online</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">New Users</p>
                  <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.newUsersThisMonth}</p>
                </div>
                <div className="text-4xl">🆕</div>
              </div>
              <p className="text-green-600 dark:text-green-400 text-xs mt-3">Joined this month</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">System Uptime</p>
                  <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">{stats.systemUptime}</p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
              <p className="text-green-600 dark:text-green-400 text-xs mt-3">Last 30 days</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Users</h2>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Loading users...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                  Error: {typeof error === "string" ? error : error.message}
                </div>
              )}

              {!loading && users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{user.name}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                !loading && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">No users found</p>
                  </div>
                )
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">User Growth</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">↑ 15%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">System Load</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Storage Used</span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-600 dark:bg-orange-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate("/users/add")}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    Add New User
                  </button>
                  <button className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
