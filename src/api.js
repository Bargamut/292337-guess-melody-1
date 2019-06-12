import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if ([400, 403].indexOf(err.response.status) > -1) {
      onLoginFail();
      return;
    }

    throw err;
  };

  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true
  });

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
