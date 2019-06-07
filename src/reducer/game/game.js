const initialState = {
  step: -1,
  mistakes: 0
};

const ActionType = {
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_STATE: `RESET_STATE`
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

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

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
      type: ActionType.INCREMENT_MISTAKE,
      payload: !isAnswerCorrect ? 1 : 0
    };
  },

  resetState: () => {
    return {
      type: ActionType.RESET_STATE
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });

    case ActionType.INCREMENT_MISTAKE:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });

    case ActionType.RESET_STATE:
      return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  BusinessLogic,
  reducer
};
