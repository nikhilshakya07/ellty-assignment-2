import React from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';

interface LoginPageProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
  onLogin: (userData: { username: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isAuthenticated, username, onLogout, onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={onLogout}
      />
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
