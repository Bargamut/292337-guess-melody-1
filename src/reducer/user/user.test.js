import {
  ActionType,
  reducer
} from './user';

describe(`Reducer works correctly`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false
    });
  });

  it(`Should change correctly authorization required`, () => {
    expect(reducer({
      isAuthorizationRequired: false
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    })).toEqual({
      isAuthorizationRequired: true
    });

    expect(reducer({
      isAuthorizationRequired: true
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false
    })).toEqual({
      isAuthorizationRequired: false
    });
  });
});
