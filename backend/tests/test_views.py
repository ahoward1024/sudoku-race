#!/usr/bin/env python3.6
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
    req_json = {'game_id': 0, 'pos': 0, 'char': '4'}
    app.test_client.put('/game.create')
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    assert len(as_json['board']) == 81
    assert as_json
    assert 'INCOMPLETE' == as_json['status']


def test_game_move_missing_json():
    request, response = app.test_client.post('/game.move')
    assert response.status == 500


def test_game_move_invalid_dict():
    req_json = {}
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    assert response.status == 500


def test_make_invalid_move():
    req_json = {'game_id': 0, 'pos': 0, 'char': '8'}
    create_req, create_resp = app.test_client.put('/game.create')
    created_board = json.loads(create_resp.body)['board']
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    # Board doesn't change because the move was invalid
    assert created_board == as_json['board']
    assert 'INVALID' == as_json['status']


def test_make_valid_move():
    req_json = {'game_id': 0, 'pos': 0, 'char': '4'}
    create_req, create_resp = app.test_client.put('/game.create')
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
    # The new board will have a 1 at the head of it
    assert as_json['board'] == '4' + as_json['board'][1:]
    assert 'INCOMPLETE' == as_json['status']


def test_make_multiple_moves():
    app.test_client.put('/game.create')

    moves = [
        {'game_id': 0, 'pos': 0, 'char': '4'},
        {'game_id': 0, 'pos': 1, 'char': '2'}
    ]

    for move in moves:
        request, response = app.test_client.post('/game.move',
                                                 data=json.dumps(move))
        as_json = json.loads(response.body)
    assert as_json['board'] == '42' + as_json['board'][2:]
    assert 'INCOMPLETE' == as_json['status']


def test_that_trying_to_reuse_a_spot_fails():
    app.test_client.put('/game.create')

    moves = [
        {'game_id': 0, 'pos': 0, 'char': '4'},
        {'game_id': 0, 'pos': 0, 'char': '2'}
    ]

    for move in moves:
        request, response = app.test_client.post('/game.move',
                                                 data=json.dumps(move))
        as_json = json.loads(response.body)

    # The second move should not be applied
    assert as_json['board'] == '4' + as_json['board'][1:]
    assert 'INVALID' == as_json['status']
