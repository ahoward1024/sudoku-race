import json

from sudokurace import app


def test_game_create_not_null():
    request, response = app.test_client.get('/game.create')
    as_json = json.loads(response.body)
    assert as_json


def test_game_move_not_null():
    req_json = {'id': 0, 'move': {}}
    request, response = app.test_client.post('/game.move',
                                             data=json.dumps(req_json))
    as_json = json.loads(response.body)
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
