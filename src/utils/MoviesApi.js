import { apiMoviesBaseUrl, } from './utils.js'

import Api from './api';

class MoviesApi extends Api {
  getMovies() {
    return this._request('/beatfilm-movies');
  }
}

export const MoviesApiInstance = new MoviesApi(apiMoviesBaseUrl);
