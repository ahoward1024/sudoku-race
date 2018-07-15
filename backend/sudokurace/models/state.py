#!/usr/bin/env python3.6
from sudokurace.core import is_valid_board

# Global state, will need to store this externally, eventually
game_state = {}


def create_game():
    new_id = len(game_state.keys())
    game_state[new_id] = {
        'id': new_id,
        'board': ('    735     6   9486 4     34   71             52   '
                  '87     4 3297   8     413    '),
        'move_history': []
    }
    return game_state[new_id]


def make_move(game_id, move):
    current_game_state = game_state[game_id]
    current_game_state['move_history'] += [move]
    current_board = current_game_state['board']
    pos = move['pos']
    new_board = current_board[:pos] + move['char'] + \
        current_board[pos + 1:]

    if is_valid_board(new_board):
        return {'id': game_id, 'board': new_board}
    else:
        return {'id': game_id, 'board': current_board}
