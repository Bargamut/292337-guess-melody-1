import MockAdapter from 'axios-mock-adapter';
import api from '../api';
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
      questions: []
    });
  });

  it(`Should increment current step by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions: []
    }, {
      type: ActionTypes.INCREMENT_STEP,
      payload: 1
    })).toEqual({
      step: 0,
      mistakes: 0,
      questions: []
    });
  });

  it(`Should increment current mistake by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions: []
    }, {
      type: ActionTypes.INCREMENT_MISTAKE,
      payload: 1
    })).toEqual({
      step: -1,
      mistakes: 1,
      questions: []
    });
  });

  it(`Should correctly reset state`, () => {
    expect(reducer({
      step: 3,
      mistakes: 2,
      questions: []
    }, {
      type: ActionTypes.RESET_STATE
    })).toEqual({
      step: -1,
      mistakes: 0,
      questions: []
    });
  });

  it(`Should make a correct API call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_QUESTIONS,
          payload: [{fake: true}]
        });
      });
  });
});
