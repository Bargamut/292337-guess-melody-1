import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.js';

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
  const expectedAnswer = [false, false, false, false];

  const genreQuestionScreen = renderer.create(
      <GenreQuestionScreen
        question={question}
        onChange={jest.fn()}
        onAnswer={handleSubmit}
        userAnswer={expectedAnswer}
        renderAnswer={jest.fn()}
      />,
      {
        createNodeMock: (element) => {
          if (element.type === `audio`) {
            return {
              src: ``
            };
          }

          return null;
        }
      }
  ).toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});
