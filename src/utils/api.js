export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  setToken(token) {
    this._token = token;
  }

  _request(tailUrl, method = 'GET', data = null) {
    const requestParams = {
      method: method,
      headers: {},
    }

    if (this._token != null) {
      requestParams.headers['Authorization'] = `Bearer ${this._token}`;
    }


    if (data != null) {
      requestParams['body'] = JSON.stringify(data);
      requestParams.headers['Content-Type'] = 'application/json';
    }

    return fetch(this._baseUrl + tailUrl, requestParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const error = new Error(`Ошибка ${res.status}: ${res.statusText}`);
        error.status = res.status;
        return Promise.reject(error);
      })
  }
}




