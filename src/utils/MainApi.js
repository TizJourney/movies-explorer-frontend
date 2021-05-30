import { apiBackendBaseUrl } from './utils.js'

import Api from './api';

class MainApi extends Api {
  getMovies() {
    return this._request('/beatfilm-movies');
  }
}

export const MainApiInstance = new MainApi(apiBackendBaseUrl);
