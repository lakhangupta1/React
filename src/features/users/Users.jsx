import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { fetchUsers, deleteUser } from "../users/userSlice";
import { setFavicon } from "../../utils/faviconUtils";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    document.title = "Users - Admin Dashboard";
    setFavicon('/users');
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Users List</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and view all users in the system</p>
            </div>
            <button
              onClick={() => navigate("/users/add")}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <span>+</span> Add New User
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Total Users</h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{users.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Active Users</h3>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                {Math.floor(users.length * 0.85)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Inactive Users</h3>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {Math.floor(users.length * 0.15)}
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">All Users</h2>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Loading users...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-4">
                Error: {typeof error === "string" ? error : error.message}
              </div>
            )}

            {!loading && users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                      <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">ID</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Name</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Email</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Status</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-all">
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure?")) {
                                dispatch(deleteUser(user.id));
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No users found</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
