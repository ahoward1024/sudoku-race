import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputCell from '../InputCell';
import sinon from 'sinon';

Enzyme.configure({'adapter': new Adapter()});

test('Create an InputCell', () => {
  const tree = renderer.create(<InputCell/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test if the sent keypress was not a number', () => {
  // Test case for keycode 100: d should return false
  const event = new KeyboardEvent('keydown', {'key': 'd'});
  expect(InputCell.isValidInput(event.key)).toBe(false);
});

test('Test if the sent keypress was greater than a single digit', () => {
  // Test case for keycode 100: d should return false
  const event = new KeyboardEvent('keydown', {'key': '12'});
  expect(InputCell.isValidInput(event.key)).toBe(false);
});

test('Test if the sent keypress was 0 (outside of possible move in sudoku)', () => {
  // Test case for keycode 100: d should return false
  const event = new KeyboardEvent('keydown', {'key': '0'});
  expect(InputCell.isValidInput(event.key)).toBe(false);
});

test('Test if the sent keypress is a number', () => {
  // Test case for keycode 100: d should return false
  const event = new KeyboardEvent('keydown', {'key': '1'});
  expect(InputCell.isValidInput(event.key)).toBe(true);
});
