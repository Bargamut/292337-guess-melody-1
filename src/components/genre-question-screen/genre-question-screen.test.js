import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
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
};

it(`Genre Question Screen renders correctly`, () => {
  const {genre, answers} = mock;

  const genreQuestionScreen = renderer.create(
      <GenreQuestionScreen
        genre={genre}
        answers={answers}
      />
  ).toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});
