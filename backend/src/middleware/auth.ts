// JWT Authentication middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWTPayload } from '../types';
import { findUserById } from '../data/storage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    // Verify user still exists
    const user = findUserById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // Attach user info to request
    (req as AuthenticatedRequest).user = {
      userId: decoded.userId,
      username: decoded.username
    };

    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Optional middleware for routes that can work with or without authentication
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // No token provided, continue without authentication
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = findUserById(decoded.userId);
    
    if (user) {
      (req as AuthenticatedRequest).user = {
        userId: decoded.userId,
        username: decoded.username
      };
    }
  } catch (error) {
    // Invalid token, but continue without authentication
  }

  next();
}
