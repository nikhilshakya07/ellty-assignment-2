// In-memory storage for the Number Discussion application
import { User, Discussion, Operation, OperationWithChildren } from '../types';

// In-memory arrays to store data (no database required)
export const users: User[] = [];
export const discussions: Discussion[] = [];
export const operations: Operation[] = [];

// Helper function to generate unique IDs
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to find user by username
export function findUserByUsername(username: string): User | undefined {
  return users.find(user => user.username === username);
}

// Helper function to find user by ID
export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

// Helper function to find discussion by ID
export function findDiscussionById(id: string): Discussion | undefined {
  return discussions.find(discussion => discussion.id === id);
}

// Helper function to find operation by ID
export function findOperationById(id: string): Operation | undefined {
  return operations.find(operation => operation.id === id);
}

// Helper function to get operations for a specific discussion
export function getOperationsByDiscussionId(discussionId: string): Operation[] {
  return operations.filter(operation => operation.discussionId === discussionId);
}

// Helper function to get operations by parent ID
export function getOperationsByParentId(parentId: string): Operation[] {
  return operations.filter(operation => operation.parentId === parentId);
}

// Helper function to build operation tree recursively
export function buildOperationTree(discussionId: string, parentId: string | null = null): OperationWithChildren[] {
  const directOperations = operations.filter(
    operation => operation.discussionId === discussionId && operation.parentId === parentId
  );
  
  return directOperations.map(operation => ({
    ...operation,
    children: buildOperationTree(discussionId, operation.id)
  }));
}
