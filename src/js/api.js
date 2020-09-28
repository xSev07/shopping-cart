import axios from "axios";

export const createAPI = () => {
  const api = axios.create({
    baseURL: `http://zjdog.mocklab.io`,
    timeout: 5000,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

