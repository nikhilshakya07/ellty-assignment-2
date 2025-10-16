// Discussion routes for managing starting numbers
import { Router, Request, Response } from 'express';
import { AuthenticatedRequest, CreateDiscussionRequest, DiscussionWithOperations } from '../types';
import { discussions, operations, generateId, buildOperationTree } from '../data/storage';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/discussions - Get all discussions with their operation trees (public)
router.get('/', (req: Request, res: Response): void => {
  try {
    // Build complete discussion tree with nested operations
    const discussionsWithOperations: DiscussionWithOperations[] = discussions.map(discussion => ({
      ...discussion,
      operations: buildOperationTree(discussion.id)
    }));

    // Sort by creation date (newest first)
    discussionsWithOperations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json(discussionsWithOperations);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/discussions - Create a new discussion (authenticated)
router.post('/', authenticateToken, (req: Request, res: Response): void => {
  try {
    const { startingNumber }: CreateDiscussionRequest = req.body;
    const user = (req as AuthenticatedRequest).user!;

    // Validate input
    if (typeof startingNumber !== 'number' || isNaN(startingNumber)) {
      res.status(400).json({ error: 'Starting number must be a valid number' });
      return;
    }

    // Create new discussion
    const newDiscussion = {
      id: generateId(),
      startingNumber,
      createdBy: user.userId,
      createdByUsername: user.username,
      createdAt: new Date()
    };

    // Add to storage
    discussions.push(newDiscussion);

    res.status(201).json(newDiscussion);
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/discussions/:id - Get a specific discussion with its operation tree (public)
router.get('/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    const discussion = discussions.find(d => d.id === id);
    if (!discussion) {
      res.status(404).json({ error: 'Discussion not found' });
      return;
    }

    const discussionWithOperations: DiscussionWithOperations = {
      ...discussion,
      operations: buildOperationTree(discussion.id)
    };

    res.json(discussionWithOperations);
  } catch (error) {
    console.error('Error fetching discussion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
