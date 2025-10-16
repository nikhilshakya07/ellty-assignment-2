export interface User {
  id: string;
  username: string;
}

export interface Operation {
  id: string;
  discussionId: string;
  parentId: string | null;
  operationType: 'add' | 'subtract' | 'multiply' | 'divide';
  rightNumber: number;
  result: number;
  createdBy: string;
  createdByUsername: string;
  createdAt: string;
  children: Operation[]; // Changed from 'operations' to 'children' to match backend
}

export interface Discussion {
  id: string;
  startingNumber: number;
  createdBy: string;
  createdByUsername: string;
  createdAt: string;
  operations: Operation[];
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface CreateDiscussionRequest {
  startingNumber: number;
}

export interface AddOperationRequest {
  discussionId: string;
  parentId: string | null;
  operationType: 'add' | 'subtract' | 'multiply' | 'divide';
  rightNumber: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}
