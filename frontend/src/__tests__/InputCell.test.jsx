import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputCell from '../InputCell';
import sinon from 'sinon';

global.fetch = require('jest-fetch-mock');

Enzyme.configure({'adapter': new Adapter()});

const cellSize = 10;
const textScale = 1.0;
const gameid = 0;
const index = 0;
const id = '1';
const value = '1';
const url = 'http://foo.baz';
const fullBoard = '15248937673925684146837129538712465959176342824689' +
  '5713914637582625948137873512964';
const nonFullBoard = '    735     6   9486 4     34   71             52   87     4 3297   8     413    ';
const validMove = '4   735     6   9486 4     34   71             52   87     4 3297   8     413    ';
const mockCallback = jest.fn();

let inputCell = '';

describe('InputCell Testing', () => {
  beforeEach(() => {
    fetch.resetMocks();
    inputCell = <InputCell
      id={id}
      value={value}
      gameid={gameid}
      index={index}
      cellSize={cellSize}
      updateBoard={mockCallback}
      url={url}
      textScale={textScale}/>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Create an empty InputCell', () => {
    const tree = renderer.create(inputCell).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Create an InputCell', () => {
    const tree = renderer.create(inputCell).toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('Sending move to server returns INCOMPLETE', async () => {
    fetch.mockResponse(JSON.stringify({
      'id': 0,
      'board': {validMove},
      'status': 'INCOMPLETE'
    }), {'status': 200});
    const wrapper = await shallow(inputCell);
    await wrapper.instance().sendMoveToServer(`${url}/game.move`, '0');
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('Sending move to server returns COMPLETE', async () => {
    fetch.mockResponse(JSON.stringify({
      'id': 0,
      'board': {fullBoard},
      'status': 'COMPLETE'
    }), {'status': 200});
    const wrapper = await shallow(inputCell);
    await wrapper.instance().sendMoveToServer(`${url}/game.move`, '0');
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('Sending move to server returns INVALID', async () => {
    fetch.mockResponse(JSON.stringify({
      'id': 0,
      'board': {fullBoard},
      'status': 'INVALID'
    }), {'status': 200});
    const wrapper = await shallow(inputCell);
    await wrapper.instance().sendMoveToServer(`${url}/game.move`, '0');
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test('Sending move to server failure', async () => {
    const wrapper = await shallow(inputCell);
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test('Changing InputCell updates state', () => {
    const wrapper = shallow(inputCell);
    expect(wrapper.state('value')).toBe('1');
    const event = {'target': {'value': '2'}};
    wrapper.find('input').simulate('change', event);
    expect(wrapper.state('value')).toBe('2');
    const event2 = {'target': {'value': 'A'}};
    wrapper.find('input').simulate('change', event2);
    // There should be no change to the value of InputCell if a non-valid input is inserted
    expect(wrapper.state('value')).toBe('2');
  });

  test('Test backspace sets value of InputCell to empty', () => {
    const event = {
      'key': 'Backspace',
      'target': {'value': ''}
    };
    // We _must_ use mount here otherwise we will get an error about the event being null
    const wrapper = mount(inputCell);
    wrapper.find('input').simulate('change', event);
    expect(wrapper.state('value')).toBe('');
  });

  test('Test if the sent keypress was not a number', () => {
    const event = new KeyboardEvent('keydown', {'key': 'd'});
    expect(InputCell.isValidInput(event.key)).toBe(false);
  });

  test('Test if the sent keypress was greater than a single digit', () => {
    const event = new KeyboardEvent('keydown', {'key': '12'});
    expect(InputCell.isValidInput(event.key)).toBe(false);
  });

  test('Test if the sent keypress was 0 (outside of possible move in sudoku)', () => {
    const event = new KeyboardEvent('keydown', {'key': '0'});
    expect(InputCell.isValidInput(event.key)).toBe(false);
  });

  test('Test if the sent keypress is a number', () => {
    const event = new KeyboardEvent('keydown', {'key': '1'});
    expect(InputCell.isValidInput(event.key)).toBe(true);
  });

  test('Test if the sent keypress was empty (backspace)', () => {
    const event = new KeyboardEvent('keydown', {'key': 20});
    expect(InputCell.isValidInput('')).toBe(true);
  });
});

