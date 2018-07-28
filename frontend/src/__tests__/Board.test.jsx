import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';
import InputCell from '../InputCell';
import NoInputCell from '../NoInputCell';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Fetch from 'fetch-simulator';
import fetch from 'jest-fetch-mock';

global.fetch = require('jest-fetch-mock');

Enzyme.configure({'adapter': new Adapter()});

const url = 'http://foo.baz';
const cellSize = 10;
const textScale = 1.0;
const fullBoard = '15248937673925684146837129538712465959176342824689' +
  '5713914637582625948137873512964';

describe('testing', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Board creation and fetch success', async () => {
    fetch.mockResponse(JSON.stringify({
        'board': fullBoard,
        'id': 0
      }), {'status': 200});
    const wrapper = await shallow(<Board
                                  url={url}
                                  cellSize={cellSize}
                                  textScale={textScale}/>);
    await wrapper.instance().componentDidMount();
    // This will be 2 because we "call" intance().componentDidMount() to await on it
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(wrapper.state('board')).toEqual(fullBoard);
  });

  test('Board creation and fetch success but board is undefined', async () => {
    fetch.mockResponse(JSON.stringify({
        'board': undefined,
        'id': 0
      }), {'status': 200});
    const wrapper = await shallow(<Board
                                  url={url}
                                  cellSize={cellSize}
                                  textScale={textScale}/>);
    await wrapper.instance().componentDidMount();
    // This will be 2 because we "call" intance().componentDidMount() to await on it
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(wrapper.state('board')).toEqual('');
  });

  test('Board creation and fetch failure', async () => {
    fetch.mockRejectOnce('fake error (fetch calls fails)');
    const wrapper = await shallow(<Board
                                  url={url}
                                  cellSize={cellSize}
                                  textScale={textScale}/>);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(wrapper.state('board')).toEqual('');
  });

});

