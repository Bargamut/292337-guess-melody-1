const initialState = {
  mistakes: 0,
  step: -1
};


const ActionCreators = {
  'INCREMENT_MISTAKE': (question, userAnswer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`: isAnswerCorrect = userAnswer.every((answer, i) => (
        answer === (question.genre === question.answers[i].genre))
      ); break;
      case `artist`: isAnswerCorrect = userAnswer.artist === question.song.artist; break;
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
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = {};

  switch (action.type) {
    case `INCREMENT_STEP`:
      Object.assign(updatedState, state, {
        step: state.step + action.payload
      });
      break;
    case `INCREMENT_MISTAKE`:
      Object.assign(updatedState, state, {
        mistakes: state.mistakes + action.payload
      });
      break;
    default: Object.assign(updatedState, state); break;
  }

  return updatedState;
};

export {ActionCreators, reducer};
