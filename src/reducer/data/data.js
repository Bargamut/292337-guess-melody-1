const initialState = {
  questions: []
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreators.loadQuestions(response.data));
      });
  }
};

const ActionTypes = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreators = {
  loadQuestions: (questions) => {
    return {
      type: ActionTypes.LOAD_QUESTIONS,
      payload: questions
    };
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = {};

  switch (action.type) {
    case ActionTypes.LOAD_QUESTIONS:
      Object.assign(updatedState, state, {
        questions: action.payload
      });
      break;

    default:
      Object.assign(updatedState, initialState);
      break;
  }

  return updatedState;
};

export {
  Operation,
  ActionTypes,
  ActionCreators,
  reducer
};
