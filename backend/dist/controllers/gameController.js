"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePlayerMove = exports.resetGame = void 0;
const game_1 = require("../models/game");
const resetGame = (req, res) => {
    const game = {
        squares: Array(9).fill({ value: null }),
        xIsNext: true,
        result: null,
        xScore: 0,
        oScore: 0,
    };
    res.json(game);
};
exports.resetGame = resetGame;
const handlePlayerMove = (req, res) => {
    const { index } = req.params;
    const game = req.body.game;
    if (game.result || game.squares[parseInt(index)].value) {
        return res.sendStatus(400);
    }
    game.squares[parseInt(index)].value = game.xIsNext ? 'X' : 'O';
    game.xIsNext = !game.xIsNext;
    const winner = (0, game_1.calculateWinner)(game.squares);
    if (winner) {
        game.result = winner;
        if (winner === 'X') {
            game.xScore++;
        }
        else {
            game.oScore++;
        }
    }
    else if (game.squares.every((square) => square.value !== null)) {
        game.result = 'draw';
    }
    res.json(game);
};
exports.handlePlayerMove = handlePlayerMove;
