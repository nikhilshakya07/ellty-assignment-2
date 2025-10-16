// TypeScript interfaces for the Number Discussion application

export interface User {
  id: string;
  username: string;
  password: string; // hashed password
  createdAt: Date;
}

export interface Discussion {
  id: string;
  startingNumber: number;
  createdBy: string; // userId reference
  createdByUsername: string; // for display purposes
  createdAt: Date;
}

export interface Operation {
  id: string;
  discussionId: string; // reference to parent discussion
  parentId: string | null; // reference to parent operation if replying to operation, null if replying to starting number
  operationType: 'add' | 'subtract' | 'multiply' | 'divide';
  rightNumber: number; // the number user chose
  result: number; // calculated result
  createdBy: string; // userId reference
  createdByUsername: string; // for display purposes
  createdAt: Date;
}

// Extended interfaces for API responses
export interface DiscussionWithOperations extends Discussion {
  operations: OperationWithChildren[];
}

export interface OperationWithChildren extends Operation {
  children: OperationWithChildren[];
}

// Request/Response interfaces
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
}

export interface CreateDiscussionRequest {
  startingNumber: number;
}

export interface CreateOperationRequest {
  discussionId: string;
  parentId: string | null;
  operationType: 'add' | 'subtract' | 'multiply' | 'divide';
  rightNumber: number;
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
}

// Express Request extension for authenticated routes
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}
