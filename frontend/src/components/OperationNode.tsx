import React, { useState } from 'react';
import type { Operation } from '../types';
import { formatDate, getOperationSymbol, calculateLeftNumber } from '../services/api';
import AddOperation from './AddOperation';
import { getAvatarColor } from '../utils/avatar';

interface OperationNodeProps {
  operation: Operation;
  discussionId: string;
  onOperationAdded: () => void;
}

const OperationNode: React.FC<OperationNodeProps> = ({ operation, discussionId, onOperationAdded }) => {
  const [showAddOperation, setShowAddOperation] = useState(false);

  const handleOperationAdded = () => {
    setShowAddOperation(false);
    onOperationAdded();
  };

  return (
    <div className="mb-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(operation.createdByUsername)}`}>
            <span className="text-xs">
              {operation.createdByUsername.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{operation.createdByUsername}</div>
            <div className="text-xs text-gray-500">{formatDate(operation.createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="ml-12 mb-2">
        <div className="text-base font-semibold text-gray-800">
          {calculateLeftNumber(operation.result, operation.operationType, operation.rightNumber)} {getOperationSymbol(operation.operationType)} {operation.rightNumber} = <span className="text-blue-600 font-bold">{operation.result}</span>
        </div>
        <button
          onClick={() => setShowAddOperation(true)}
          className="text-blue-600 hover:text-blue-800 underline text-sm font-medium transition-colors mt-1"
        >
          Reply
        </button>
      </div>

      {showAddOperation && (
        <div className="ml-12 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <AddOperation
            discussionId={discussionId}
            parentId={operation.id}
            parentNumber={operation.result}
            onComplete={handleOperationAdded}
            onCancel={() => setShowAddOperation(false)}
          />
        </div>
      )}

      {/* Recursively render child operations */}
      {operation.children && operation.children.length > 0 && (
        <div className="ml-6 border-l-2 border-gray-300 pl-4 space-y-3">
          {operation.children.map((childOperation) => (
            <OperationNode
              key={childOperation.id}
              operation={childOperation}
              discussionId={discussionId}
              onOperationAdded={onOperationAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationNode;
