import React, { useState, useEffect } from 'react';
import type { Discussion } from '../types';
import { discussionAPI } from '../services/api';
import DiscussionTree from './DiscussionTree';

const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      console.log('Fetching discussions...');
      const data = await discussionAPI.getDiscussions();
      console.log('Discussions fetched:', data);
      setDiscussions(data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching discussions:', err);
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error') || err.message?.includes('Unable to connect')) {
        setError('Backend server is not running. Please start the backend server on port 5000.');
      } else if (err.response?.status === 0) {
        setError('Cannot connect to backend server. Please ensure the backend is running on http://localhost:5000');
      } else {
        setError('Failed to load discussions. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading discussions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mx-4">
        {error}
        <button
          onClick={fetchDiscussions}
          className="ml-2 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (discussions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No discussions yet. Be the first to start a conversation!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {discussions.map((discussion) => (
        <DiscussionTree
          key={discussion.id}
          discussion={discussion}
          onOperationAdded={fetchDiscussions}
        />
      ))}
    </div>
  );
};

export default DiscussionList;
