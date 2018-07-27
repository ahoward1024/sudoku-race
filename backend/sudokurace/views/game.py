#!/usr/bin/env python3.6
from sanic.response import json
from sudokurace import app
from sudokurace.models import state
from sudokurace.models.state import Status


@app.route('/game.create', methods=['PUT', 'OPTIONS'])
async def root(req):
    created_game = state.create_game()
    return json(created_game)


@app.route('/game.move', methods=['POST'])
async def move(req):
    if not req.json:
        return json({'status': Status.INVALID, 'message': 'No json received'})

    if 'id' not in req.json:
        return json({'status': Status.INVALID, 'message': 'Missing id'})

    if 'move' not in req.json:
        return json({'status': Status.INVALID, 'message': 'Missing move'})

    game_id = req.json['id']
    game_move = req.json['move']
    next_board_state = state.make_move(game_id, game_move)
    return json(next_board_state)
