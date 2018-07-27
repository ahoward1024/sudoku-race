#!/usr/bin/env python3.6
from sudokurace.core import solve

# Global state, will need to store this externally, eventually
game_state = {}


class Status():
    INVALID = 'INVALID'
    INCOMPLETE = 'INCOMPLETE'
    COMPLETE = 'COMPLETE'


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
    move_history = current_game_state['move_history']

    for m in move_history:
        pos = m['pos']

        if current_board[pos] != ' ':
            move_history.pop()
            return {'id': game_id, 'board': current_board,
                    'status': Status.INVALID}

        new_board = current_board[:pos] + m['char'] + \
            current_board[pos + 1:]

        if not solve(new_board):
            move_history.pop()
            return {'id': game_id, 'board': current_board,
                    'status': Status.INVALID}

        current_board = new_board

    if ' ' not in new_board:
        return {'id': game_id, 'board': new_board, 'status': Status.COMPLETE}

    return {'id': game_id, 'board': new_board, 'status': Status.INCOMPLETE}


def set_state(game_id, board):
    """Manually set the state of a board.

    This should only be used for testing.
    """
    game_state[game_id]['board'] = board


def get_state():
    """Returns the state of every game
    :returns: The current state of all games
    """
    return game_state


def reset_all_state():
    global game_state
    game_state = {}
