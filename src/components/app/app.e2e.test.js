import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

configure({adapter: new Adapter()});

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

it(`On click to WelcomeScreen App switches to the firs question`, () => {
  const {questions} = mock;

  const app = mount(
      <App
        time={0}
        errorCount={0}
        questions={questions}
      />
  );

  const button = app.find(`button`);
  button.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);

  const title = app.find(`.game__title`);
  expect(title).toHaveLength(1);
  expect(title.text().indexOf(`indie-rock`)).toBeGreaterThanOrEqual(0);
});
