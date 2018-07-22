from sudokurace.core import (
    is_valid_board,
    is_valid_set
)


def test_is_valid_set():
    assert is_valid_set('123456789') is True
    assert is_valid_set('1234567  ') is True
    assert is_valid_set('123 5678 ') is True
    assert is_valid_set('5 4 3 1 2') is True
    assert is_valid_set('') is False
    assert is_valid_set('0        ') is False


def test_is_valid_board():
    board = ('    735     6   9486 4     34   71             52   87     '
             '4 3297   8     413    ')
    invalid_board = ('8   735     6   9486 4     34   71             52   '
                     '87     4 3297   8     413    ')

    assert is_valid_board(board) is True
    assert is_valid_board(invalid_board) is False
    assert is_valid_board('') is False
