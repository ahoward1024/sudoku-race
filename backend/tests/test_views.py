import json
import logging

import pytest

from sudokurace import app
from sudokurace.models.state import reset_all_state


@pytest.fixture(autouse=True)
def reset_state_fixture():
    logging.info('resetting state')
    reset_all_state()


def test_game_create_not_null():
    request, response = app.test_client.put('/game.create')
    as_json = json.loads(response.body)
    assert as_json


def test_game_move_not_null():
    app.test_client.put('/game.create')
    req_json = {'id': 0, 'move': {'pos': 0, 'char': '8'}}
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    assert len(as_json['board']) == 81
    assert as_json


def test_game_move_missing_json():
    request, response = app.test_client.post('/game.move')
    assert response.body == b'No json received'


def test_game_move_missing_id():
    req_json = {'move': {}}
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    assert response.body == b'Json was missing id'


def test_game_move_missing_move():
    req_json = {'id': 0}
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    assert response.body == b'Json was missing move'


def test_make_invalid_move():
    req_json = {'id': 0, 'move': {'pos': 0, 'char': '8'}}
    create_req, create_resp = app.test_client.put('/game.create')
    created_board = json.loads(create_resp.body)['board']
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    # Board doesn't change because the move was invalid
    assert created_board == as_json['board']


def test_make_valid_move():
    req_json = {'id': 0, 'move': {'pos': 0, 'char': '1'}}
    create_req, create_resp = app.test_client.put('/game.create')
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    # The new board will have a 1 at the head of it
    assert as_json['board'] == '1' + as_json['board'][1:]


def test_make_multiple_moves():
    app.test_client.put('/game.create')

    moves = [
        {'id': 0, 'move': {'pos': 0, 'char': '1'}},
        {'id': 0, 'move': {'pos': 1, 'char': '2'}}
    ]

    for move in moves:
        request, response = app.test_client.post('/game.move',
                                                 data=json.dumps(move))
        as_json = json.loads(response.body)
    assert as_json['board'] == '12' + as_json['board'][2:]


def test_that_trying_to_reuse_a_spot_fails():
    app.test_client.put('/game.create')

    moves = [
        {'id': 0, 'move': {'pos': 0, 'char': '1'}},
        {'id': 0, 'move': {'pos': 0, 'char': '2'}}
    ]

    for move in moves:
        request, response = app.test_client.post('/game.move',
                                                 data=json.dumps(move))
        as_json = json.loads(response.body)

    # The second move should not be applied
    assert as_json['board'] == '1' + as_json['board'][1:]
