import { API_MAIN_BASE_URL } from './utils.js'

import Api from './Api';

class MainApi extends Api {
  register(name, email, password) {
    return this._request('/signup', 'POST', { name, password, email });
  }

  login(email, password) {
    return this._request('/signin', 'POST', { password, email });
  }

  getUserInfo(token) {
    return this._request('/users/me');
  }

  updateUserInfo(data) {
    return this._request('/users/me', 'PATCH', data);
  }

  getMovies() {
    return this._request('/movies');
  }

  saveMovie(movieData) {
    return this._request('/movies', 'POST', movieData);
  }

  removeMovie(id) {
    return this._request(`/movies/${id}`, 'DELETE');
  }
}

export const MainApiInstance = new MainApi(API_MAIN_BASE_URL);
