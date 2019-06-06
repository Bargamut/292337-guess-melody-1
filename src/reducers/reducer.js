const initialState = {
  mistakes: 0,
  step: -1,
  questions: [],
  isAuthorizationRequired: false
};

const BusinessLogic = {
  isGenreAnswerCorrect: (userAnswer, question) => {
    return userAnswer.every((answer, i) => (
      answer === (question.genre === question.answers[i].genre))
    );
  },

  isArtistAnswerCorrect: (userAnswer, question) => {
    return userAnswer.artist === question.song.artist;
  }
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
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  RESET_STATE: `RESET_STATE`
};

const ActionCreators = {
  incrementMistake: (question, userAnswer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`:
        isAnswerCorrect = BusinessLogic.isGenreAnswerCorrect(userAnswer, question);
        break;
      case `artist`:
        isAnswerCorrect = BusinessLogic.isArtistAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: ActionTypes.INCREMENT_MISTAKE,
      payload: !isAnswerCorrect ? 1 : 0
    };
  },

  incrementStep: () => {
    return {
      type: ActionTypes.INCREMENT_STEP,
      payload: 1
    };
  },

  loadQuestions: (questions) => {
    return {
      type: ActionTypes.LOAD_QUESTIONS,
      payload: questions
    };
  },

  requiredAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },

  resetState: () => {
    return {
      type: ActionTypes.RESET_STATE
    };
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = {};

  switch (action.type) {
    case ActionTypes.INCREMENT_STEP:
      Object.assign(updatedState, state, {
        step: state.step + action.payload
      });
      break;

    case ActionTypes.INCREMENT_MISTAKE:
      Object.assign(updatedState, state, {
        mistakes: state.mistakes + action.payload
      });
      break;

    case ActionTypes.LOAD_QUESTIONS:
      Object.assign(updatedState, state, {
        questions: action.payload
      });
      break;

    case ActionTypes.REQUIRED_AUTHORIZATION:
      Object.assign(updatedState, state, {
        isAuthorizationRequired: action.payload
      });
      break;

    case ActionTypes.RESET_STATE:
      Object.assign(updatedState, initialState);
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
  BusinessLogic,
  reducer
};
