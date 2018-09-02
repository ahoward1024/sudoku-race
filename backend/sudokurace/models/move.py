#!/usr/bin/env python3.6
import attr
from sudokurace.dtos.move import MoveRequestDTO


@attr.s(auto_attribs=True, slots=True, frozen=True)
class Move(object):
    pos: int
    char: str

    @classmethod
    def from_dto(cls, dto: MoveRequestDTO):
        return cls(dto.pos, dto.char)
