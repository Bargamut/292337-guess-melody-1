import {
  ActionType,
  ActionCreator,
  BusinessLogic,
  reducer
} from './game';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(BusinessLogic.isArtistAnswerCorrect({
      artist: `correct-artist`,
      picture: `correct-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(true);

    expect(BusinessLogic.isArtistAnswerCorrect({
      artist: `incorrect-artist-2`,
      picture: `incorrect-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(BusinessLogic.isGenreAnswerCorrect([false, false, true, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `blues`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `jazz`,
          src: `3`,
        },
      ]
    })).toEqual(true);


    expect(BusinessLogic.isGenreAnswerCorrect([false, false, false, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `jazz`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `blues`,
          src: `3`,
        },
      ]
    })).toEqual(false);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    },
    {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKE,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        },
        {
          genre: `jazz`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    },
    [false, true, false, false])).toEqual({
      type: ActionType.INCREMENT_MISTAKE,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake([true, true, true, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Should increment current step by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    })).toEqual({
      step: 0,
      mistakes: 0,
    });
  });

  it(`Should increment current mistake by a given number`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1
    })).toEqual({
      step: -1,
      mistakes: 1,
    });
  });

  it(`Should correctly reset state`, () => {
    expect(reducer({
      step: 3,
      mistakes: 2,
    }, {
      type: ActionType.RESET_STATE
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });
});
