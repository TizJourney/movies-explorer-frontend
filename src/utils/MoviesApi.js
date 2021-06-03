import { API_MOVIES_BASE_URL } from './utils.js'

import Api from './Api';

class MoviesApi extends Api {
  getMovies() {
    return this._request('/beatfilm-movies');
  }
}

export const MoviesApiInstance = new MoviesApi(API_MOVIES_BASE_URL);
