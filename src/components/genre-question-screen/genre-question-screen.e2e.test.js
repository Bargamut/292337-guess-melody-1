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
  }
};

it(`Form does not sending by submit answer`, () => {
  const {question} = mock;
  const handleSubmit = jest.fn();
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

it(`onAnswer callback have answers array after submit form`, () => {
  const {question} = mock;
  const handleSubmit = jest.fn();
  const preventFormSending = jest.fn();
  const expectedAnswer = [true, false, true, false];

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        onAnswer={handleSubmit}
      />
  );

  const form = genreQuestionScreen.find(`form`);
  const answers = genreQuestionScreen.find(`.game__input`);

  answers.at(0).simulate(`change`);
  genreQuestionScreen.update();

  answers.at(2).simulate(`change`);
  genreQuestionScreen.update();

  form.simulate(`submit`, {preventDefault: preventFormSending});

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(preventFormSending).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(expectedAnswer);
});
