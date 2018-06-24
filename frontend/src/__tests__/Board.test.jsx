import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({'adapter': new Adapter()});

test('Create an empty Board', () => {
  const tree = renderer.create(<Board/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create a board', () => {
  const fullBoard = '15248937673925684146837129538712465959176342824689' +
    '5713914637582625948137873512964';
  const wrapper = shallow(<Board/>);

  expect(renderer.create(wrapper).toJSON()).toMatchSnapshot();
  wrapper.setState({'board': fullBoard});
  expect(renderer.create(wrapper).toJSON()).toMatchSnapshot();
});
