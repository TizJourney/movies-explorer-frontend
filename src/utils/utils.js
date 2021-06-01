// параметры запросов по сети
export const API_MOVIES_BASE_URL = 'https://api.nomoreparties.co';

const REACT_APP_API_URL='//api.tizjourney-films.nomo.nomoredomains.monster';

export const API_MAIN_BASE_URL = `${window.location.protocol}${REACT_APP_API_URL || '//localhost:3001'}`

// параметры хранения токена
export const TOKEN_KEY_NAME = 'jwt-token';
export const MOVIES_REQUEST_KEY_NAME = 'movies-request';
export const SAVED_MOVIES_REQUEST_KEY_NAME = 'saved-movies-request';

// стандартный текст ошибки
export const ERROR_TITLE ='Ошибка загрузки'
export const ERROR_MESSAGE='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

// параметры работы для storage'а
export const STORAGE_KEY_PREFIX = 'storage_';

// длительность короткометражки
export const SHORT_MOVIE_DURATION_THRESHOLD = 40;

// параметеры загрузки данных по кнопке "Ещё"
export const MORE_BUTTON_TOP_WIDTH_THRESHOLD =1280;
export const MORE_BUTTON_BOTTOM_WIDTH_THRESHOLD = 480;
export const MORE_BUTTON_RESOLUTION_SETTINGS = {
  big: {default: 12, columns: 3, grow: 3},
  medium: {default: 8, columns: 2, grow: 2},
  small: {default: 5, columns: 1, grow: 2},
}
