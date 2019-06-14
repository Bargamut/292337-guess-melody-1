import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should to be NULL of activePlayerKey`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activePlayerKey).toBeNull();
});