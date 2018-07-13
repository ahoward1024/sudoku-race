#!/usr/bin/env python3.6

from sanic.response import json, text

from sudokurace import app
from sudokurace.models import state


@app.route('/game.create')
async def root(req):
    created_game = state.create_game()
    return json(created_game)


@app.route('/game.move', methods=['POST'])
async def move(req):
    if not req.json:
        return text('No json received')

    if 'id' not in req.json:
        return text('Json was missing id')

    if 'move' not in req.json:
        return text('Json was missing move')

    game_id = req.json['id']
    print(game_id)

    game_move = req.json['move']
    print(game_move)

    next_board_state = state.make_move(game_id, game_move)
    print(next_board_state)

    return json(next_board_state)
