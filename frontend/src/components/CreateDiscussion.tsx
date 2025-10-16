import React, { useState } from 'react';
import { discussionAPI } from '../services/api';

interface CreateDiscussionProps {
  onComplete: () => void;
  onCancel: () => void;
}

const CreateDiscussion: React.FC<CreateDiscussionProps> = ({ onComplete, onCancel }) => {
  const [startingNumber, setStartingNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await discussionAPI.createDiscussion({ startingNumber });
      onComplete();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create discussion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-md mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create New Discussion</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Number
          </label>
          <input
            type="number"
            value={startingNumber}
            onChange={(e) => setStartingNumber(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter starting number"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Discussion'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiscussion;
