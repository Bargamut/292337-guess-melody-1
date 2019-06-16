import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {App} from "./app.js";
import { Type } from '../../types';

const mock = {
  questions: [
    {
      type: Type.GENRE,
      genre: `indie-rock`,
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
    {
      type: Type.ARTIST,
      song: {
        artist: `Пелагея`,
        src: ``
      },
      answers: [
        {
          artist: `Пелагея`,
          picture: ``
        },
        {
          artist: `Краснознаменная дивизия имени моей бабушки`,
          picture: ``
        },
        {
          artist: `Lorde`,
          picture: ``
        }
      ]
    }
  ]
};

it(`App correctly renders with Welcome Screen`, () => {
  const {questions} = mock;

  const tree = renderer
    .create(<App
      questions={questions}
      step={-1}
      mistakes={0}
      renderScreen={jest.fn()}
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
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders with Genre Question Screen`, () => {
  const {questions} = mock;

  const tree = renderer
    .create(<App
      questions={questions}
      step={0}
      mistakes={0}
      renderScreen={jest.fn()}
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
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders with Artist Question Screen`, () => {
  const {questions} = mock;

  const tree = renderer
    .create(<App
      questions={questions}
      step={1}
      mistakes={0}
      renderScreen={jest.fn()}
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
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
