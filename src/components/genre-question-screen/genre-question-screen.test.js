import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

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

it(`Genre Question Screen renders correctly`, () => {
  const {question, handleSubmit} = mock;

  const genreQuestionScreen = renderer.create(
      <GenreQuestionScreen
        question={question}
        onAnswer={handleSubmit}
      />
  ).toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});