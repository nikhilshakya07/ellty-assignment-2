import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { tokenManager } from './services/api';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      const token = tokenManager.getToken();
      if (token) {
        setIsAuthenticated(true);
        // You could decode the token to get username, but for now we'll get it from login
        // For simplicity, we'll store username in localStorage as well
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } else {
        setIsAuthenticated(false);
        setUsername(undefined);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    tokenManager.removeToken();
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername(undefined);
  };

  const handleLogin = (userData: { username: string }) => {
    setIsAuthenticated(true);
    setUsername(userData.username);
    localStorage.setItem('username', userData.username);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isAuthenticated={isAuthenticated}
                username={username}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage
                  isAuthenticated={isAuthenticated}
                  username={username}
                  onLogout={handleLogout}
                  onLogin={handleLogin}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <RegisterPage
                  isAuthenticated={isAuthenticated}
                  username={username}
                  onLogout={handleLogout}
                />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;