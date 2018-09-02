#!/usr/bin/env python3.6
from enum import Enum

import attr
from marshmallow import Schema, fields
from marshmallow_enum import EnumField


class Status(Enum):
    INVALID = 'INVALID'
    INCOMPLETE = 'INCOMPLETE'
    COMPLETE = 'COMPLETE'


@attr.s(auto_attribs=True, slots=True, frozen=True)
class MoveRequestDTO(object):
    game_id: int
    pos: int
    char: str


class MoveRequestDTOSchema(Schema):
    game_id = fields.Int()
    pos = fields.Int()
    char = fields.String()


@attr.s(auto_attribs=True, slots=True, frozen=True)
class MoveResponseDTO(object):
    game_id: int
    board: int
    status: Status


class MoveResponseDTOSchema(Schema):
    game_id = fields.Int()
    board = fields.String()
    status = EnumField(Status)
