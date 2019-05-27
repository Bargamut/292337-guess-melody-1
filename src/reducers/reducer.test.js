import {reducer} from './reducer';

it(`Should return initial state by default`, () => {
  expect(reducer(undefined, {})).toEqual({
    step: -1,
    mistakes: 0
  });
});

it(`Should increment current step by a given number`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0
  }, {
    type: `INCREMENT_STEP`,
    payload: 1
  })).toEqual({
    step: 0,
    mistakes: 0
  });
});

it(`Should increment current mistake by a given number`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0
  }, {
    type: `INCREMENT_MISTAKE`,
    payload: 1
  })).toEqual({
    step: -1,
    mistakes: 1
  });
});
