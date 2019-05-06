import React from 'react';
import renderer from 'react-test-renderer';
import App from "./app.jsx";


it(`App correctly renders after relaunch`, () => {
  const clickHandler = jest.fn();

  const tree = renderer
    .create(<App
      time={0}
      errorCount={0}
      onClickStartBtn={clickHandler}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
