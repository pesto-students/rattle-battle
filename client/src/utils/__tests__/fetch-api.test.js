import Axios from 'axios';
import fetchAPI, {
  getAPI, postAPI, putAPI, deleteAPI,
} from '../fetch-api';

// fixtures
const requestConfig = { a: 1, b: 2, c: 3 };
const AxiosResolveValue = { status: 200, data: { message: 'success' } };
const AxiosRejectedValue = { response: { data: { error: 'go away' } } };

jest.mock('axios');
Axios.mockResolvedValue(AxiosResolveValue);

afterEach(() => {
  Axios.mockClear();
});

const testAxiosCallMethod = async (apiFunction, methodName) => {
  test('should make a request with correct method', async () => {
    await expect(apiFunction('/api/someroute')(requestConfig)).resolves.toEqual(AxiosResolveValue);
    const AxiosCalledWith = Axios.mock.calls[0][0];
    expect(AxiosCalledWith.method).toBe(methodName);
    expect(AxiosCalledWith.url).toBe('/api/someroute');
    expect(AxiosCalledWith).toMatchObject(requestConfig);
  });
};

const testAxiosRejection = async (apiFunction) => {
  test('should return error message if request fails', async () => {
    Axios.mockRejectedValueOnce(AxiosRejectedValue);
    await expect(apiFunction()).rejects.toEqual({ error: 'go away' });
  });
};

const testAPICallMethod = (apiFunction, methodName) => {
  testAxiosCallMethod(apiFunction, methodName);
  testAxiosRejection(apiFunction());
};

describe('fetch API', () => {
  test('should call axios with passed config', async () => {
    await expect(fetchAPI(requestConfig)).resolves.toEqual(AxiosResolveValue);
    expect(Axios).toHaveBeenCalledWith(requestConfig);
  });

  testAxiosRejection(fetchAPI);
});

describe('get post put delete APIs', () => {
  test('should return a curried function when called with a url', () => {
    expect(getAPI('/api/someroute')).toBeInstanceOf(Function);
    expect(postAPI('/api/someroute')).toBeInstanceOf(Function);
    expect(putAPI('/api/someroute')).toBeInstanceOf(Function);
    expect(deleteAPI('/api/someroute')).toBeInstanceOf(Function);
  });

  describe('get API', () => {
    testAPICallMethod(getAPI, 'get');
  });

  describe('post API', () => {
    testAPICallMethod(postAPI, 'post');
  });

  describe('put API', () => {
    testAPICallMethod(putAPI, 'put');
  });

  describe('delete API', () => {
    testAPICallMethod(deleteAPI, 'delete');
  });
});
