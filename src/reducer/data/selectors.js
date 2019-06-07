import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((question) => {
      return question.type === `genre`;
    })
);

const radomFilter = (_state) => {
  return Math.random() > 0.5;
};

export const getRandomArtistQuestions = createSelector(
    getQuestions,
    radomFilter,
    (resultOne, resultTwo) => {
      return resultOne.filter((question) => {
        return resultTwo && question.type === `artist`;
      });
    }
);
