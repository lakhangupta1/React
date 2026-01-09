import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { setFavicon } from "../../utils/faviconUtils";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    document.title = "Settings - Admin Dashboard";
    setFavicon('/settings');
  }, []);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : {
      appName: "MyApp",
      emailNotifications: true,
      twoFactor: true,
      dataRetention: 30,
    };
  });

  const handleChange = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              ⚙️ Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your application settings and preferences</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📋 General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">Application Name</label>
                  <input
                    type="text"
                    value={settings.appName}
                    onChange={(e) =>
                      setSettings({ ...settings, appName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
                    Data Retention Days
                  </label>
                  <input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataRetention: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔔 Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">📧 Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive email updates about system events
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleChange("emailNotifications")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔒 Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">🔐 Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable 2FA for additional security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactor}
                      onChange={() => handleChange("twoFactor")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  </label>
                </div>
                <div className="border-t dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">🔑 Password Management</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🎨 Display</h2>
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      🌙 Dark Mode
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {darkMode ? "🌙 Dark theme is enabled" : "☀️ Light theme is enabled"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  </label>
                </div>

                {/* Theme Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${!darkMode ? 'border-blue-500 bg-gray-50' : 'border-gray-300 dark:border-gray-600'} transition-colors duration-300`}>
                    <h4 className="font-semibold text-gray-800 mb-2">☀️ Light Mode</h4>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-gray-800 dark:text-gray-200 text-sm">
                      Clean, bright interface for daytime use
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${darkMode ? 'border-blue-500 dark:bg-gray-900' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🌙 Dark Mode</h4>
                    <div className="bg-gray-800 dark:bg-gray-700 rounded p-3 text-gray-200 dark:text-gray-300 text-sm">
                      Easy on the eyes for nighttime use
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                ✅ Save Settings
              </button>
              <button className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
