import React, { useState } from 'react';
import { discussionAPI, calculateResult, getOperationSymbol } from '../services/api';

interface AddOperationProps {
  discussionId: string;
  parentId: string | null;
  parentNumber: number;
  onComplete: () => void;
  onCancel: () => void;
}

const AddOperation: React.FC<AddOperationProps> = ({
  discussionId,
  parentId,
  parentNumber,
  onComplete,
  onCancel
}) => {
  const [operationType, setOperationType] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [rightNumber, setRightNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Adding operation:', {
        discussionId,
        parentId,
        operationType,
        rightNumber
      });
      
      const result = await discussionAPI.addOperation({
        discussionId,
        parentId,
        operationType,
        rightNumber
      });
      
      console.log('Operation added successfully:', result);
      onComplete();
    } catch (err: any) {
      console.error('Error adding operation:', err);
      setError(err.response?.data?.message || 'Failed to add operation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const result = calculateResult(parentNumber, operationType, rightNumber);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Add Operation</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation Type
          </label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="add">+ Add</option>
            <option value="subtract">- Subtract</option>
            <option value="multiply">× Multiply</option>
            <option value="divide">÷ Divide</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number
          </label>
          <input
            type="number"
            value={rightNumber}
            onChange={(e) => setRightNumber(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number"
            required
          />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800 font-medium">
            Preview: {parentNumber} {getOperationSymbol(operationType)} {rightNumber} = <span className="font-bold text-blue-900">{result}</span>
          </div>
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
            {loading ? 'Adding...' : 'Add Operation'}
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

export default AddOperation;
