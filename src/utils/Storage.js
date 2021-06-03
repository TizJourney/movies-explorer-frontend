import { STORAGE_KEY_PREFIX } from './utils.js'

class Storage {
  constructor(storagePrefix) {
    this._prefix = storagePrefix;
  }

  set(key, value) {
    localStorage.setItem(`${this._prefix}${key}`, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(`${this._prefix}${key}`));
  }

  remove(key) {
    localStorage.removeItem(`${this._prefix}${key}`);
  }
}

export const storageInstance = new Storage(STORAGE_KEY_PREFIX);

