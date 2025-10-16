import React from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

interface NavbarProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, username, onLogout }) => {
  const handleLogout = () => {
    authAPI.logout();
    onLogout();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Number Discussion
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">
                  Welcome, <span className="font-semibold">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
