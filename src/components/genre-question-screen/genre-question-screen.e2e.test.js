import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
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

it(`Form does not sending by submit answer`, () => {
  const {
    question,
    handleSubmit
  } = mock;
  const preventFormSending = jest.fn();

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        onAnswer={handleSubmit}
      />
  );

  const form = genreQuestionScreen.find(`form`);
  form.simulate(`submit`, {preventDefault: preventFormSending});

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(preventFormSending).toHaveBeenCalledTimes(1);
});
