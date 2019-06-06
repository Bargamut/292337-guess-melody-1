import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const getISAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};
