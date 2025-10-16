// Operations routes for managing mathematical operations on numbers
import { Router, Request, Response } from 'express';
import { AuthenticatedRequest, CreateOperationRequest } from '../types';
import { discussions, operations, generateId, findDiscussionById, findOperationById } from '../data/storage';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /api/operations - Create a new operation (authenticated)
router.post('/', authenticateToken, (req: Request, res: Response): void => {
  try {
    const { discussionId, parentId, operationType, rightNumber }: CreateOperationRequest = req.body;
    const user = (req as AuthenticatedRequest).user!;

    // Validate input
    if (!discussionId || !operationType || typeof rightNumber !== 'number' || isNaN(rightNumber)) {
      res.status(400).json({ error: 'discussionId, operationType, and rightNumber are required' });
      return;
    }

    if (!['add', 'subtract', 'multiply', 'divide'].includes(operationType)) {
      res.status(400).json({ error: 'operationType must be one of: add, subtract, multiply, divide' });
      return;
    }

    // Validate discussion exists
    const discussion = findDiscussionById(discussionId);
    if (!discussion) {
      res.status(404).json({ error: 'Discussion not found' });
      return;
    }

    // Calculate the parent number
    let parentNumber: number;
    
    if (parentId === null) {
      // Replying to the starting number
      parentNumber = discussion.startingNumber;
    } else {
      // Replying to an existing operation
      const parentOperation = findOperationById(parentId);
      if (!parentOperation) {
        res.status(404).json({ error: 'Parent operation not found' });
        return;
      }
      
      // Verify parent operation belongs to the same discussion
      if (parentOperation.discussionId !== discussionId) {
        res.status(400).json({ error: 'Parent operation does not belong to the specified discussion' });
        return;
      }
      
      parentNumber = parentOperation.result;
    }

    // Calculate result based on operation type
    let result: number;
    switch (operationType) {
      case 'add':
        result = parentNumber + rightNumber;
        break;
      case 'subtract':
        result = parentNumber - rightNumber;
        break;
      case 'multiply':
        result = parentNumber * rightNumber;
        break;
      case 'divide':
        if (rightNumber === 0) {
          res.status(400).json({ error: 'Cannot divide by zero' });
          return;
        }
        result = parentNumber / rightNumber;
        break;
      default:
        res.status(400).json({ error: 'Invalid operation type' });
        return;
    }

    // Create new operation
    const newOperation = {
      id: generateId(),
      discussionId,
      parentId,
      operationType,
      rightNumber,
      result,
      createdBy: user.userId,
      createdByUsername: user.username,
      createdAt: new Date()
    };

    // Add to storage
    operations.push(newOperation);

    res.status(201).json(newOperation);
  } catch (error) {
    console.error('Error creating operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/operations/discussion/:discussionId - Get all operations for a specific discussion (public)
router.get('/discussion/:discussionId', (req: Request, res: Response): void => {
  try {
    const { discussionId } = req.params;

    // Validate discussion exists
    const discussion = findDiscussionById(discussionId);
    if (!discussion) {
      res.status(404).json({ error: 'Discussion not found' });
      return;
    }

    // Get all operations for this discussion
    const discussionOperations = operations.filter(op => op.discussionId === discussionId);

    res.json(discussionOperations);
  } catch (error) {
    console.error('Error fetching operations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/operations/:id - Get a specific operation (public)
router.get('/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    const operation = findOperationById(id);
    if (!operation) {
      res.status(404).json({ error: 'Operation not found' });
      return;
    }

    res.json(operation);
  } catch (error) {
    console.error('Error fetching operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
