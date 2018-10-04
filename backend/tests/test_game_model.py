import cattr
from sudokurace.models.move import Move
from sudokurace.models.game import Game


def test_valid_game_object():
    game_id = 0
    board = 'asdf'
    first_move = Move(0, '2')
    g = Game(game_id, board, first_move)
    print(cattr.unstructure(g))
