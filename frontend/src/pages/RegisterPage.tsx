import React from 'react';
import Navbar from '../components/Navbar';
import Register from '../components/Register';

interface RegisterPageProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ isAuthenticated, username, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={onLogout}
      />
      <Register />
    </div>
  );
};

export default RegisterPage;
