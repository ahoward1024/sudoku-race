from sudokurace import app


def test_string_from_root_route():
    request, response = app.test_client.get('/')
    assert 'Welcome to SudokuRace' == response.text
