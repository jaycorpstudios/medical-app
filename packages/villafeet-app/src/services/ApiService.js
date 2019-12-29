/*
  global API_BASE_URL
*/

import ApiInterceptor from './ApiInterceptor';

const unsignedEndpoints = ['auth/register', 'auth/login'];

const ApiService = () => {
  const interceptor = new ApiInterceptor(API_BASE_URL, unsignedEndpoints);

  function get({ endpoint, options = {} }) {
    return interceptor.fetchData({ endpoint, options: { ...options, method: 'GET' } });
  }
  function post({ endpoint, options = {} }) {
    return interceptor.fetchData({ endpoint, options: { ...options, method: 'POST' } });
  }
  function put({ endpoint, options = {} }) {
    return interceptor.fetchData({ endpoint, options: { ...options, method: 'PUT' } });
  }
  function remove({ endpoint, options = {} }) {
    return interceptor.fetchData({ endpoint, options: { ...options, method: 'DELETE' } });
  }
  function file({ endpoint, options = {} }) {
    return interceptor.fetchData({ endpoint, options: { ...options, method: 'POST' }, isFile: true });
  }
  // Expose get, post, put, delete methods
  return {
    get, post, put, delete: remove, file,
  };
};

// return a Singleton instance
export default new ApiService();
