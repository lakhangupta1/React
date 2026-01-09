import React, { useEffect } from "react";
import { setFavicon } from "../utils/faviconUtils";

const Home = () => {
  useEffect(() => {
    document.title = "Home - Admin Dashboard";
    setFavicon('/');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Welcome to My Enterprise App
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-lg text-center">
        This is the Home page. Build scalable enterprise applications using React, Redux, and Tailwind CSS.
      </p>

      <button className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg shadow-md transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;
