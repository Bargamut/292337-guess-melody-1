import axios from 'axios';

const onSuccess = (response) => {
  return response;
};

const onFail = (err) => {
  if (err.response.status === 403) {
    return {
      data: null
    };
  }

  return err;
};

const api = axios.create({
  baseURL: `https://es31-server.appspot.com/guess-melody`,
  timeout: 5000,
  withCredentials: true
});

api.interceptors.response.use(onSuccess, onFail);

const funct = (dispatch) => {
  return api;
};

export default api;
