import React from 'react';
import renderer from 'react-test-renderer';
import ResultSuccessScreen from './result-success-screen.jsx.js';

it(`Result Success renders correctly`, () => {
  const resultSuccessScreen = renderer.create(
      <ResultSuccessScreen
        onReplaybtnClick={jest.fn()}
      />
  ).toJSON();

  expect(resultSuccessScreen).toMatchSnapshot();
});
