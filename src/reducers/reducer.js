const initialState = {
  mistakes: 0,
  step: -1,
  questions: []
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

export const Operation = {
  loadQuestions: () => (dispatch) => {
    return fetch(`https://es31-server.appspot.com/guess-melody/questions`)
      .then((response) => {
        return response.json();
      })
      .then((questions) => {
        dispatch(ActionCreators.loadQuestions(questions));
      });
  }
};

const ActionTypes = {
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
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

  resetState: () => {
    return {
      type: ActionTypes.RESET_STATE
    };
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = {};

  switch (action.type) {
    case ActionTypes.incrementStep:
      Object.assign(updatedState, state, {
        step: state.step + action.payload
      });
      break;

    case ActionTypes.incrementMistake:
      Object.assign(updatedState, state, {
        mistakes: state.mistakes + action.payload
      });
      break;

    case ActionTypes.loadQuestions:
      Object.assign(updatedState, state, {
        questions: action.payload
      });
      break;

    case ActionTypes.resetState: Object.assign(updatedState, initialState); break;

    default: Object.assign(updatedState, initialState); break;
  }

  return updatedState;
};

export {ActionCreators, reducer};
