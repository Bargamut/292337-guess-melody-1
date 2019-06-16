import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Type } from '../../types';
import GenreQuestionScreen from './genre-question-screen';

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
