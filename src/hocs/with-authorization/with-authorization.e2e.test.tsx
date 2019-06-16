import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from "enzyme-adapter-react-16";

import { withAuthorization } from './with-authorization';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withAuthorization(MockComponent);

it(`Should to be empty of email & password`, () => {
  const wrapper = shallow(<MockComponentWrapped
    onReplayBtnClick={jest.fn()}
    login={jest.fn()}
  />);

  expect(wrapper.state().email).toEqual(``);
  expect(wrapper.state().password).toEqual(``);
});
