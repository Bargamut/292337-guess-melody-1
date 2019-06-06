const initialState = {
  isAuthorizationRequired: false
};

const ActionTypes = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`
};

const ActionCreators = {
  requiredAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: status
    };
  }
};

const reducer = (state = initialState, action) => {
  const updatedState = {};

  switch (action.type) {
    case ActionTypes.REQUIRED_AUTHORIZATION:
      Object.assign(updatedState, state, {
        isAuthorizationRequired: action.payload
      });
      break;

    default:
      Object.assign(updatedState, initialState);
      break;
  }

  return updatedState;
};

export {
  ActionTypes,
  ActionCreators,
  reducer
};
