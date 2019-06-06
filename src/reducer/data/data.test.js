import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {
  ActionTypes,
  Operation
} from './data';

describe(`Reducer works correctly`, () => {
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
