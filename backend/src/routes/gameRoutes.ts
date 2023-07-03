import express, { Request, Response } from 'express';
import { resetGame, handlePlayerMove } from '../controllers/gameController';

const router = express.Router();

router.post('/reset', resetGame);
router.post('/move/:index', handlePlayerMove);

export default router;
