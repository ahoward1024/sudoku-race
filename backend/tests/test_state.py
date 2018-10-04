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
from sudokurace.models.move import Move


@pytest.fixture(autouse=True)
def reset_state_fixture():
    logging.info('resetting state')
    reset_all_state()


def test_getting_state():
    assert {} == get_state()


def test_invalid_move_is_not_recorded_in_move_history():
    new_game = create_game()
    game_id = new_game.game_id
    assert [] == new_game.move_history
    move = Move(0, '8')
    make_move(game_id, move)
    assert [] == new_game.move_history


def test_that_attempting_a_move_on_a_used_spot_clears_history():
    new_game = create_game()
    game_id = new_game.game_id
    valid_move = Move(0, '4')
    invalid_move = Move(0, '1')

    assert [] == new_game.move_history
    make_move(game_id, valid_move)
    assert [valid_move] == new_game.move_history
    make_move(game_id, invalid_move)
    assert [valid_move] == new_game.move_history


def test_a_complete_board_has_status_complete():
    board = ('  1973568537681294869452713342867159798315426615249387'
             '156794832973528641284136975')
    new_game = create_game()
    game_id = new_game.game_id
    set_state(game_id, board)
    assert board == get_state()[game_id].board

    resp = make_move(game_id, Move(1, '2'))
    assert 'INCOMPLETE' == resp.status

    resp = make_move(game_id, Move(0, '4'))
    assert 'COMPLETE' == resp.status
