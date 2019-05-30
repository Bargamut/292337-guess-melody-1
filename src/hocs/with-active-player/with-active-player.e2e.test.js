import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Shouldchange activePlayerKey when call onPlayBrnClick`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().activePlayerKey).toBeNull();

  wrapper.props().onPlayBtnClick(`answer-0`);
  expect(wrapper.props().activePlayerKey).toEqual(`answer-0`);

  wrapper.props().onPlayBtnClick(`answer-1`);
  expect(wrapper.props().activePlayerKey).toEqual(`answer-1`);

  wrapper.props().onPlayBtnClick(`answer-2`);
  expect(wrapper.props().activePlayerKey).toEqual(`answer-2`);

  wrapper.props().onPlayBtnClick(`answer-2`);
  expect(wrapper.props().activePlayerKey).toBeNull();
});
