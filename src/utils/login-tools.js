import { TOKEN_KEY_NAME } from './utils.js'

class TokenHandler {
  constructor(tokenKeyName) {
    this._key = tokenKeyName;
  }

  set(token) {
    localStorage.setItem(this._key, token);
  }

  get() {
    return localStorage.getItem(this._key);
  }

  remove() {
    localStorage.removeItem(this._key);
  }
}

export const tokenHandlerInstance = new TokenHandler(TOKEN_KEY_NAME);
