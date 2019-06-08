const initialState = {
  isAuthorizationRequired: true,
  user: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`,
  LOGOUT: `LOGOUT`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },

  login: (user) => {
    return {
      type: ActionType.LOGIN,
      payload: user
    };
  },

  logout: () => {
    return {
      type: ActionType.LOGOUT
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });

    case ActionType.LOGIN:
      return Object.assign({}, state, {
        user: action.payload
      });

    case ActionType.LOGOUT:
      return Object.assign({}, state, {
        user: {}
      });
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer
};
