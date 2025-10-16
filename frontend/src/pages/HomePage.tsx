import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DiscussionList from '../components/DiscussionList';
import CreateDiscussion from '../components/CreateDiscussion';

interface HomePageProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, username, onLogout }) => {
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDiscussionCreated = () => {
    setShowCreateDiscussion(false);
    setRefreshKey(prev => prev + 1); // Trigger refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={onLogout}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Number Discussions
          </h1>
          <p className="text-gray-600 mb-6">
            Start conversations with numbers and see how others respond with mathematical operations.
          </p>
          
          {isAuthenticated && (
            <div className="mb-6">
              <button
                onClick={() => setShowCreateDiscussion(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                + Create New Discussion
              </button>
            </div>
          )}
        </div>

        {showCreateDiscussion && (
          <div className="mb-8">
            <CreateDiscussion
              onComplete={handleDiscussionCreated}
              onCancel={() => setShowCreateDiscussion(false)}
            />
          </div>
        )}

        <div key={refreshKey}>
          <DiscussionList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
