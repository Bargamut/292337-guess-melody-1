import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  question: {
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
  onAnswer: jest.fn()
};

it(`Genre Question Screen renders correctly`, () => {
  const {question, onAnswer} = mock;

  const genreQuestionScreen = renderer.create(
      <GenreQuestionScreen
        question={question}
        onAnswer={onAnswer}
      />
  ).toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});
