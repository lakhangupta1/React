import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { setFavicon } from "../../utils/faviconUtils";

export default function Reports() {
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    document.title = "Reports - Admin Dashboard";
    setFavicon('/reports');
  }, []);

  const reportData = {
    totalUsers: users.length,
    activeUsers: Math.floor(users.length * 0.85),
    inactiveUsers: Math.floor(users.length * 0.15),
    newUsersThisMonth: Math.floor(users.length * 0.2),
    growthRate: "15%",
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">View system statistics and user analytics</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{reportData.totalUsers}</p>
              <p className="text-green-600 text-xs mt-2">↑ Growth</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Active Users</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{reportData.activeUsers}</p>
              <p className="text-gray-600 text-xs mt-2">Currently active</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-semibold">New This Month</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{reportData.newUsersThisMonth}</p>
              <p className="text-gray-600 text-xs mt-2">New registrations</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Growth Rate</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">{reportData.growthRate}</p>
              <p className="text-green-600 text-xs mt-2">↑ Monthly increase</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">User Distribution</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Active</span>
                    <span className="font-semibold">{reportData.activeUsers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Inactive</span>
                    <span className="font-semibold">{reportData.inactiveUsers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">API Response Time</span>
                  <span className="text-green-600 font-semibold">45ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Uptime</span>
                  <span className="text-green-600 font-semibold">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database Size</span>
                  <span className="text-blue-600 font-semibold">2.5 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cache Hit Rate</span>
                  <span className="text-purple-600 font-semibold">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-700">New user registered</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-700">System backup completed</span>
                <span className="text-gray-500 text-sm">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-700">Database optimized</span>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700">Server maintenance performed</span>
                <span className="text-gray-500 text-sm">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
