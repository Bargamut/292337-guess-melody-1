import * as React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from './with-user-answer';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: Type.GENRE,
    genre: `rock`,
    answers: [
      {
        genre: `indie-rock`,
        src: ``
      },
      {
        genre: `rock`,
        src: ``
      },
      {
        genre: `indie-rock`,
        src: ``
      },
      {
        genre: `folk-rock`,
        src: ``
      }
    ]
  },
  handleSubmit: jest.fn()
};

it(`Should change userAnswer when call onPlayBrnClick`, () => {
  const {question} = mock;
  const wrapper = shallow(
      <MockComponentWrapped
        question={question}
        onAnswer={jest.fn()}
      />
  );

  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().userAnswer).toEqual([false, true, false, false]);

  wrapper.props().onChange(0);
  expect(wrapper.props().userAnswer).toEqual([true, true, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().userAnswer).toEqual([true, false, false, false]);

  wrapper.props().onChange(2);
  expect(wrapper.props().userAnswer).toEqual([true, false, true, false]);
});
