#!/usr/bin/env python3.6

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
    game_state[game_id]['move_history'] += [move]
    print(game_state)
    return game_state[game_id]
