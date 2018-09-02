import typing

import attr
import cattr
import pytest
from marshmallow import Schema, fields, ValidationError


@attr.s(auto_attribs=True, slots=True, frozen=True)
class Node(object):
    text: str


@attr.s(auto_attribs=True, slots=True, frozen=True)
class Document(object):
    node: Node


def test_an_attrs_class_with_a_nested_attrs_class():
    p = {
        'node': {
            'text': 'testing'
        }
    }
    doc = cattr.structure(p, Document)
    assert doc.node.text == 'testing'


@attr.s(auto_attribs=True, slots=True, frozen=True)
class Person(object):
    name: str
    children: typing.List['Person'] = None


class PersonSchema(Schema):
    name = fields.Str()
    children = fields.Nested('PersonSchema', many=True)


# Hook for recursive structuring
def make_person(persons):
    return [cattr.structure(person, Person) for person in persons]


cattr.register_structure_hook(Person, lambda d, t: Person(d['name'],
                              make_person(d['children'])))


def test_recursive_forward_reference_structuring():
    p = {
        'name': 'marsh',
        'children': [
            {
                'name': 'child',
                'children': []
            }
        ]
    }
    cc = cattr.structure(p, Person)
    assert cc.name == 'marsh'
    assert len(cc.children) == 1
    assert cc.children[0].name == 'child'


def test_validation_of_further_nested_structures():
    p = {
        'name': 'marsh',
        'children': [
            {
                'name': 'child',
                'children': [
                    {
                        'name': 'deeply nested child',
                        'children': []
                    }
                ]
            }
        ]
    }
    PersonSchema().validate(p)
    ps = PersonSchema().load(p)
    cc = cattr.structure(ps, Person)
    assert cc.name == 'marsh'
    assert len(cc.children) == 1
    assert cc.children[0].name == 'child'
    assert cc.children[0].children[0].name == 'deeply nested child'
    assert len(cc.children[0].children[0].children) == 0


def test_validation_error():
    p = {
        'name': 'marsh',
        'children': [
            {
                'name': 0  # Should be a string
            }
        ]
    }
    # Slightly confusing syntax. "not .validate()" being True
    # means that errors were found
    assert not PersonSchema().validate(p) is True

    # We can alternatively check for an exception to be thrown via .load()
    with pytest.raises(ValidationError) as e_info:
        PersonSchema().load(p)

    assert e_info.value.messages == {
        'children': {
            0: {
                'name': ['Not a valid string.']
            }
        }
    }
