import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api';
import {
  // ActionCreators,
  ActionTypes,
  Operation,
  reducer
} from './reducer';

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

  it(`Should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_QUESTIONS,
          payload: [{fake: true}]
        });
      });
  });
});
