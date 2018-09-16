#!/usr/bin/env python3.6
import cattr
from sanic.response import json
from sanic.exceptions import ServerError
from sudokurace.app import app
from sudokurace.models import state
from sudokurace.models.move import Move
from sudokurace.dtos.move import (
    MoveRequestDTO,
    MoveRequestDTOSchema,
    MoveResponseDTOSchema,
)


@app.route('/game.create', methods=['PUT', 'OPTIONS'])
async def root(req):
    created_game = state.create_game()
    game_as_dict = cattr.unstructure(created_game)
    return json(game_as_dict)


@app.route('/game.move', methods=['POST'])
async def move(req):
    if req.json == {} or MoveRequestDTOSchema().validate(req.json):
        raise ServerError('Bad request', status_code=500)

    validated = MoveRequestDTOSchema().load(req.json)
    move_dto = cattr.structure(validated, MoveRequestDTO)
    move = Move.from_dto(move_dto)
    next_board_state = state.make_move(move_dto.game_id, move)

    response_as_dict = cattr.unstructure(next_board_state)

    if MoveResponseDTOSchema().validate(response_as_dict):
        raise ServerError('Bad request', status_code=500)

    return json(next_board_state)
