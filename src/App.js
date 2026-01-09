import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';

function App() {
  // Initialize dark mode from localStorage on app load
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <nav className="p-4 bg-blue-600 dark:bg-blue-900 text-white shadow-lg transition-colors duration-300">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="text-xl font-bold">MyApp</div>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-blue-100 font-semibold transition">
                Home
              </Link>
              <Link to="/login" className="hover:text-blue-100 font-semibold transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-100 font-semibold transition">
                Register
              </Link>
              <Link to="/dashboard" className="hover:text-blue-100 font-semibold transition">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
