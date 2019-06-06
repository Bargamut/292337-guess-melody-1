import axios from 'axios';
import {ActionCreators} from './reducers/reducer';

export const createAPI = (dispatch) => {
  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreators.requiredAuthorization(true));
    }

    return err;
  };

  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true
  });

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
