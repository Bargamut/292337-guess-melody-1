import {
  ActionTypes,
  reducer
} from './game';

describe(`Reducer works correctly`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      questions: [],
      isAuthorizationRequired: false
    });
  });

  it(`Should increment current step by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions: [],
      isAuthorizationRequired: false
    }, {
      type: ActionTypes.INCREMENT_STEP,
      payload: 1
    })).toEqual({
      step: 0,
      mistakes: 0,
      questions: [],
      isAuthorizationRequired: false
    });
  });

  it(`Should increment current mistake by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions: [],
      isAuthorizationRequired: false
    }, {
      type: ActionTypes.INCREMENT_MISTAKE,
      payload: 1
    })).toEqual({
      step: -1,
      mistakes: 1,
      questions: [],
      isAuthorizationRequired: false
    });
  });

  it(`Should correctly reset state`, () => {
    expect(reducer({
      step: 3,
      mistakes: 2,
      questions: [],
      isAuthorizationRequired: false
    }, {
      type: ActionTypes.RESET_STATE
    })).toEqual({
      step: -1,
      mistakes: 0,
      questions: [],
      isAuthorizationRequired: false
    });
  });
});