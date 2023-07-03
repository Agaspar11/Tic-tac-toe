import { Request, Response } from 'express';
import { Game, Square, calculateWinner } from '../models/game';

export const resetGame = (req: Request, res: Response) => {
  const game: Game = {
    squares: Array(9).fill({ value: null }),
    xIsNext: true,
    result: null,
    xScore: 0,
    oScore: 0,
  };
  res.json(game);
};

export const handlePlayerMove = (req: Request<{ index: string }, any, { game: Game }>, res: Response) => {
  const { index } = req.params;
  const game: Game = req.body.game;

  if (game.result || game.squares[parseInt(index)].value) {
    return res.sendStatus(400);
  }

  game.squares[parseInt(index)].value = game.xIsNext ? 'X' : 'O';
  game.xIsNext = !game.xIsNext;

  const winner = calculateWinner(game.squares);
  if (winner) {
    game.result = winner;
    if (winner === 'X') {
      game.xScore++;
    } else {
      game.oScore++;
    }
  } else if (game.squares.every((square: Square) => square.value !== null)) {
    game.result = 'draw';
  }

  res.json(game);
};
