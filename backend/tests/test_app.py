from sudokurace.views import index


def test_string_from_root_route():
    assert 'Welcome to SudokuRace' == index.root()
