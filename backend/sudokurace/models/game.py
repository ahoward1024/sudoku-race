#!/usr/bin/env python3.6
from typing import List

import attr
from sudokurace.models.move import Move


@attr.s(auto_attribs=True, slots=True, frozen=False)
class Game(object):
    game_id: int
    board: str
    move_history: List[Move]
