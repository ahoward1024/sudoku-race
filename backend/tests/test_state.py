#!/usr/bin/env python3.6
import logging

import pytest
from sudokurace.models.state import (
    make_move,
    create_game,
    reset_all_state,
    get_state,
    set_state
)


@pytest.fixture(autouse=True)
def reset_state_fixture():
    logging.info('resetting state')
    reset_all_state()


def test_getting_state():
    assert {} == get_state()


def test_invalid_move_is_not_recorded_in_move_history():
    new_game = create_game()
    game_id = new_game['id']
    assert [] == new_game['move_history']
    make_move(game_id, {'pos': 0, 'char': '8'})
    assert [] == new_game['move_history']


def test_that_attempting_a_move_on_a_used_spot_clears_history():
    new_game = create_game()
    game_id = new_game['id']
    assert [] == new_game['move_history']
    make_move(game_id, {'pos': 0, 'char': '4'})
    assert [{'char': '4', 'pos': 0}] == new_game['move_history']
    make_move(game_id, {'pos': 0, 'char': '1'})
    assert [{'char': '4', 'pos': 0}] == new_game['move_history']


def test_a_complete_board_has_status_complete():
    board = ('  1973568537681294869452713342867159798315426615249387'
             '156794832973528641284136975')
    new_game = create_game()
    game_id = new_game['id']
    set_state(game_id, board)
    assert board == get_state()[game_id]['board']

    resp = make_move(game_id, {'pos': 1, 'char': '2'})
    assert 'INCOMPLETE' == resp['status']

    resp = make_move(game_id, {'pos': 0, 'char': '4'})
    assert 'COMPLETE' == resp['status']
