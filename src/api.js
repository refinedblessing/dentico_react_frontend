import axios from 'axios';

const fetch = (url) => {
  return axios
    .get(`${process.env.REACT_APP_API_ROOT}${url}`);
};

const put = (url, params) => {
  return axios
    .put(`${process.env.REACT_APP_API_ROOT}${url}`, params);
};

const post = (url, params) => {
  return axios
    .post(`${process.env.REACT_APP_API_ROOT}${url}`, params);
};

const Patients = {
  all: () => {
    return fetch('/patients');
  },
  update: patient => {
    return put(`/patients/${patient.id}`, { patient });
  },
  create: patient => {
    return post(`/patients`, { patient });
  }
};

export { Patients };