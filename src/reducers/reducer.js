const initialState = {
  mistakes: 0,
  step: -1
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

const ActionCreators = {
  'INCREMENT_MISTAKE': (question, userAnswer) => {
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
      type: `INCREMENT_MISTAKE`,
      payload: !isAnswerCorrect ? 1 : 0
    };
  },
  'INCREMENT_STEP': () => {
    return {
      type: `INCREMENT_STEP`,
      payload: 1
    };
  },
  'RESET_STATE': () => {
    return {
      type: `RESET_STATE`
    };
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = state;

  switch (action.type) {
    case `INCREMENT_STEP`:
      Object.assign(updatedState, {
        step: state.step + action.payload
      });
      break;
    case `INCREMENT_MISTAKE`:
      Object.assign(updatedState, {
        mistakes: state.mistakes + action.payload
      });
      break;
    case `RESET_STATE`: Object.assign(updatedState, initialState); break;
  }

  return updatedState;
};

export {ActionCreators, reducer};
