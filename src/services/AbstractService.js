import { post, put, get, patch, del } from 'utils/Helper';
import { env } from './../configs/EnvironmentConfig'


class AbstractService {
  url;
  constructor() {
    this.url = env.API_ENDPOINT_URL;
  }

  get(path, payload = {}) {
    return get(`${this.url}${path}`, payload);
  }

  post(path, payload) {
    return post(`${this.url}${path}`, payload);
  }

  put(path, payload) {
    return put(`${this.url}${path}`, payload);
  }

  delete(path) {
    return del(`${this.url}${path}`);
  }
}

export default AbstractService;