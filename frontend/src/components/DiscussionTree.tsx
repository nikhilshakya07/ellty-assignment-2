import React, { useState } from 'react';
import type { Discussion } from '../types';
import { formatDate } from '../services/api';
import OperationNode from './OperationNode';
import AddOperation from './AddOperation';
import { getAvatarColor } from '../utils/avatar';

interface DiscussionTreeProps {
  discussion: Discussion;
  onOperationAdded: () => void;
  isAuthenticated: boolean;
}

const DiscussionTree: React.FC<DiscussionTreeProps> = ({ discussion, onOperationAdded, isAuthenticated }) => {
  const [showAddOperation, setShowAddOperation] = useState(false);

  const handleOperationAdded = () => {
    setShowAddOperation(false);
    onOperationAdded();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(discussion.createdByUsername)}`}>
            <span className="text-sm">
              {discussion.createdByUsername.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{discussion.createdByUsername}</div>
            <div className="text-sm text-gray-500">{formatDate(discussion.createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          Starting Number: {discussion.startingNumber}
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowAddOperation(true)}
            className="text-blue-600 hover:text-blue-800 underline text-sm font-medium transition-colors"
          >
            Reply
          </button>
        )}
      </div>

      {showAddOperation && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <AddOperation
            discussionId={discussion.id}
            parentId={null}
            parentNumber={discussion.startingNumber}
            onComplete={handleOperationAdded}
            onCancel={() => setShowAddOperation(false)}
          />
        </div>
      )}

      <div className="ml-4 space-y-3">
        {discussion.operations.map((operation) => (
          <OperationNode
            key={operation.id}
            operation={operation}
            discussionId={discussion.id}
            onOperationAdded={onOperationAdded}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscussionTree;
