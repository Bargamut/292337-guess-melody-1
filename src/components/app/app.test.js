import React from 'react';
import renderer from 'react-test-renderer';
import App from "./app.jsx";


const mock = {
  questions: [
    {
      type: `genre`,
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
    }
  ]
};

it(`App correctly renders after relaunch`, () => {
  const {questions} = mock;

  const tree = renderer
    .create(<App
      time={0}
      errorCount={0}
      questions={questions}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
