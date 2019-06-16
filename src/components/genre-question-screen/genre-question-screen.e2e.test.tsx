import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { Type } from '../../types';
import GenreQuestionScreen from './genre-question-screen';

configure({adapter: new Adapter()});

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
  }
};

it(`Form does not sending by submit answer`, () => {
  const {question} = mock;
  const handleSubmit = jest.fn();
  const preventFormSending = jest.fn();
  const expectedAnswer = [true, false, true, false];

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        onChange={jest.fn()}
        onAnswer={handleSubmit}
        userAnswer={expectedAnswer}
        renderAnswer={jest.fn()}
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
        onChange={jest.fn()}
        onAnswer={handleSubmit}
        userAnswer={expectedAnswer}
        renderAnswer={jest.fn()}
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
  expect(answers.map((answer) => {
    return answer.prop(`checked`);
  })).toEqual(expectedAnswer);
});
