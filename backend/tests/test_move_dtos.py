import pytest
import cattr
from marshmallow.exceptions import ValidationError
from sudokurace.dtos.move import (
    MoveRequestDTO,
    MoveRequestDTOSchema
)


def test_validation_and_structuring_of_move_request():
    req_json = {'game_id': 0, 'pos': 0, 'char': '4'}
    validated = MoveRequestDTOSchema().load(req_json)
    move_req = cattr.structure(validated, MoveRequestDTO)
    assert move_req.pos == 0
    assert move_req.char == '4'
    assert cattr.unstructure(move_req) == req_json


def test_validation_fails():
    req_json = {'poss': 0, 'char': '4'}
    with pytest.raises(ValidationError):
        MoveRequestDTOSchema().load(req_json)
