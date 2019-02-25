import Axios from 'axios';
import queryParams from 'qs';
import { apiUrl } from '../config/environment';

Axios.defaults.baseURL = apiUrl;
Axios.defaults.paramsSerializer = params => queryParams.stringify(params);

const fetchAPI = options => new Promise((resolve, reject) => {
  Axios(options)
    .then(resolve)
    .catch((error) => {
      if (typeof error.response !== 'undefined') {
        reject(error.response.data);
      } else reject(error);
    });
});

const buildRequest = method => url => options => fetchAPI({ method, url, ...options });

export const getAPI = buildRequest('get');
export const postAPI = buildRequest('post');
export const putAPI = buildRequest('put');
export const deleteAPI = buildRequest('delete');

export default fetchAPI;
