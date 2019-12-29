import cacheHelper from '../utils/cache';

export default class ApiInterceptor {
  constructor(baseUrl = '', unsignedEndpoints = []) {
    this.baseUrl = baseUrl;
    this.unsignedEndpoints = unsignedEndpoints;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthHeaders() {
    const auth = cacheHelper.getItem('auth');
    if (auth) {
      this.headers.Authorization = `Bearer ${auth.token}`;
    }
  }

  removeAuthHeaders() {
    delete this.headers.Auth;
  }

  fetchData({ endpoint = '', options = {}, isFile = false }) {
    if (this.unsignedEndpoints.includes(endpoint)) {
      this.removeAuthHeaders();
    } else {
      this.setAuthHeaders();
    }
    const headers = { ...this.headers, ...options.headers };
    if (isFile) {
      delete headers['Content-Type'];
    }
    const requestOptions = {
      ...options,
      headers,
      body: isFile ? options.body : JSON.stringify(options.body),
    };
    const url = `${this.baseUrl}${endpoint}`;
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions).then((res) => {
        if (res.status === 401) {
          resolve({ success: false, unauthorized: true, message: 'Unauthorized' });
        } if (res.status !== 200) {
          // TODO: Create strategy for errors (use codes) errors need res.json() to read message
          throw { status: res.status, message: res.statusText };
        } else {
          return res.json();
        }
      })
        .then((res) => { resolve(res); })
        .catch((err) => { reject(err); });
    });
  }
}
