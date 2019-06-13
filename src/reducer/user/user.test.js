import {
  ActionCreator,
  reducer
} from './user';

const mocks = {
  userData: {
    id: 1,
    email: `Oliver.conner@gmail.com`,
    name: `Oliver.conner`
  }
};

describe(`Reducer works correctly`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false,
      user: {}
    });
  });

  it(`Should change correctly authorization required`, () => {
    expect(reducer(
        {
          isAuthorizationRequired: false,
          user: {}
        },
        ActionCreator.requireAuthorization(true)
    )).toEqual({
      isAuthorizationRequired: true,
      user: {}
    });

    expect(reducer(
        {
          isAuthorizationRequired: true,
          user: {}
        },
        ActionCreator.requireAuthorization(false)
    )).toEqual({
      isAuthorizationRequired: false,
      user: {}
    });
  });

  it(`Should login  / logout correctly`, () => {
    const {userData} = mocks;

    expect(reducer(
        {
          isAuthorizationRequired: false,
          user: {}
        },
        ActionCreator.login(userData)
    )).toEqual({
      isAuthorizationRequired: false,
      user: userData
    });

    expect(reducer(
        {
          isAuthorizationRequired: false,
          user: userData
        },
        ActionCreator.logout()
    )).toEqual({
      isAuthorizationRequired: false,
      user: {}
    });
  });
});
