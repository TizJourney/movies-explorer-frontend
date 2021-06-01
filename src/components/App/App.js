import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

// компоненты страниц сайта
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

// обёртка с защитой от неавторизованного пользователя
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// компонента отслеживания ширины окна
import WindowWidthSettings from '../WindowWidthSettings/WindowWidthSettings';

// контекст для хранения состояния пользователя
import { CurrentUserContext, USER_PLACEHOLDER_DATA } from '../../contexts/CurrentUserContext';

// работа с api и авторизацией
import { MoviesApiInstance } from '../../utils/MoviesApi';
import { MainApiInstance } from '../../utils/MainApi';
import {
  API_MOVIES_BASE_URL,
  ERROR_MESSAGE,
  ERROR_TITLE,
  SHORT_MOVIE_DURATION_THRESHOLD,
} from '../../utils/utils';
import { tokenHandlerInstance } from '../../utils/login-tools';
import { storageInstance } from '../../utils/Storage';

function AppInternal() {

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState(USER_PLACEHOLDER_DATA);

  // состояние окна
  const windowWidthSettings = WindowWidthSettings();

  // состояние прелоадера на странице фильмов
  const [isPreloaderActive, SetIsPreloaderActive] = React.useState(false);

  // состояние инфо окна (ошибок и т.п.)
  const [info, setInfo] = React.useState({});

  function handleInfo(title, message, alert=true) {
    setInfo({title, message, alert});
    setTimeout(() => { setInfo({}) }, 10000);
  }

  // состояние инпутов регистрации
  const [isRegisterBlocked, SetIsRegisterBlocked] = React.useState(false);
  const [isLoginBlocked, SetIsLoginBlocked] = React.useState(false);
  const [isProfileBlocked, SetIsProfileBlocked] = React.useState(false);


  // данные и состояния для страницы фильмов
  const [moviesData, setMoviesData] = React.useState([]);

  const [showMoviesCount, setShowMoviesCount] = React.useState(windowWidthSettings.default);
  const [moviesSearchRequest, setMoviesSearchRequest] = React.useState('');
  const [moviesFilterState, setMoviesFilterState] = React.useState(false);

  // данные и состояния для страницы сохранённых фильмов
  const [savedMoviesData, setSavedMoviesData] = React.useState([]);
  const [savedMoviesSearchRequest, setSavedMoviesSearchRequest] = React.useState('');
  const [savedMoviesFilterState, setSavedMoviesFilterState] = React.useState(false);

  const savedMovieIds = savedMoviesData.reduce(function (map, obj) {
    map[obj.movieId] = obj._id;
    return map;
  }, {});

  // результат фильтрации для страницы фильмов
  const [moviesCards, setMoviesCards] = React.useState([]);
  const isMovieMoreButtonActive = showMoviesCount < moviesCards.length;

  // результат фильтрации для страницы сохранённых фильмов
  const [savedMoviesCards, setSavedMoviesCards] = React.useState([]);

  // работа с хранилищем данных
  function saveDataToStorage() {
    storageInstance.set(currentUser.email, {
      savedMoviesSearchRequest,
      savedMoviesFilterState,
      moviesSearchRequest,
      moviesFilterState,
    })
  }

  function loadDataFromStorage() {
    const values = storageInstance.get(currentUser.email);
    if (!values) {
      return;
    }
    setMoviesSearchRequest(values.moviesSearchRequest);
    setMoviesFilterState(values.moviesFilterState);

    setSavedMoviesSearchRequest(values.savedMoviesSearchRequest);
    setSavedMoviesFilterState(values.savedMoviesFilterState);
  }

  function clearDataFromStorage() {
    storageInstance.remove(currentUser.email);
  }

  // работа с авторизацией
  function tokenCheckAndRedirect(redirect = null) {
    setCurrentUser({ ...currentUser, logged: false });
    SetIsPreloaderActive(true);

    const jwt = tokenHandlerInstance.get();
    if (jwt) {
      MainApiInstance.setToken(jwt);
      MainApiInstance.getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser({
              logged: true,
              name: res.name,
              email: res.email
            })
          }
          loadDataFromStorage();
          return MainApiInstance.getMovies();
        })
        .then((moviesData) => {
          setSavedMoviesData(moviesData);
          if (redirect) {
            history.push(redirect);
          }
        })
        .catch((e) => {
          handleInfo(ERROR_TITLE, ERROR_MESSAGE);
        })
        .finally(() => {
          SetIsPreloaderActive(false);
        })
    }
  }

  // обработчики функциональности фильтрации главной страницы фильмов
  function handleMoviesSearchRequest(request) {
    setMoviesSearchRequest(request);
    saveDataToStorage();
    setShowMoviesCount(windowWidthSettings.default);
  }

  function handleMoviesFilterStateChange(newState) {
    setMoviesFilterState(newState);
    saveDataToStorage();
  }

  function handleMovieMoreButton() {
    // кроме добавления нового ряда так же добавим карточки, чтобы они полностью занимали всю линию
    setShowMoviesCount(showMoviesCount + windowWidthSettings.grow + (windowWidthSettings.columns - Math.floor(showMoviesCount % windowWidthSettings.columns)) % windowWidthSettings.columns);
  }

  // обработчики функциональности фильтрации сохраннённых фильмов
  function handleSavedMoviesSearchRequest(request) {
    setSavedMoviesSearchRequest(request);
    saveDataToStorage();
  }

  function handleSavedMoviesFilterStateChange(newState) {
    setSavedMoviesFilterState(newState);
    saveDataToStorage();
  }

  // инициализация данных для главной страницы
  const initMoviesPage = () => {
    SetIsPreloaderActive(true);
    MoviesApiInstance.getMovies()
      .then((movies) => {
        if (movies) {
          const convertedMovies = movies.map((movieData) => {
            const movieImageUrl = movieData.image ? `${API_MOVIES_BASE_URL}${movieData.image.url}` : '';
            return {
              country: movieData.country,
              director: movieData.director,
              description: movieData.description,
              duration: movieData.duration,
              year: movieData.year,
              image: movieImageUrl,
              trailer: movieData.trailerLink,
              thumbnail: movieImageUrl,
              movieId: movieData.id.toString(),
              nameRU: movieData.nameRU,
              nameEN: movieData.nameEN
            }
          })
          setMoviesData(convertedMovies);
        }
        else {
          throw new Error(ERROR_MESSAGE)
        }
      })
      .catch((e) => {
        handleInfo(ERROR_TITLE, ERROR_MESSAGE);
      })
      .finally(() => {
        SetIsPreloaderActive(false);
      })
  }

  // инициализация данных при старте приложения
  React.useEffect(() => {
    tokenCheckAndRedirect();
    initMoviesPage();
    // eslint-disable-next-line
  }, []);

  // обработчики для работы с авторизацией
  function handleRegister(name, email, password) {
    SetIsRegisterBlocked(true);
    MainApiInstance.register(name, email, password)
      .then(() => {
        return MainApiInstance.login(email, password)
      })
      .then((res) => {
        tokenHandlerInstance.set(res.token);
        MainApiInstance.setToken(res.token);
        tokenCheckAndRedirect('/movies');
      })
      .catch((err) => {
        if (err.status && err.status === 409 ) {
          handleInfo('Ошибка регистрации', 'Пользователь с таким email уже существует');
        } else if (err.status && err.status === 400) {
          handleInfo('Ошибка регистрации', 'Проверьте формат данных');
        } else {
          handleInfo('Ошибка регистрации', 'Ошибка выполнения команды. Попробуйте снова.');
        }
      })
      .finally(() => {SetIsRegisterBlocked(false)})
  }

  function handleLogin(email, password) {
    SetIsLoginBlocked(true);
    MainApiInstance.login(email, password)
      .then((res) => {
        tokenHandlerInstance.set(res.token);
        MainApiInstance.setToken(res.token);
        tokenCheckAndRedirect('/movies');
      })
      .catch((err) => {
        if (err.status && err.status === 401 ) {
          handleInfo('Ошибка залогина', 'Неверный логин или пароль');
        } else if (err.status && err.status === 400) {
          handleInfo('Ошибка залогина', 'Проверьте формат данных');
        } else {
          handleInfo('Ошибка залогина', 'Ошибка выполнения команды. Попробуйте снова.');
        }
      })
      .finally(() => {SetIsLoginBlocked(false)})
  }

  function handleLogout() {
    tokenHandlerInstance.remove();
    setCurrentUser({ ...currentUser, logged: false })
    history.push('/');
  }

  const handleEditProfile = (values) => {
    SetIsProfileBlocked(true);
    MainApiInstance.updateUserInfo(values)
      .then((res) => {
        clearDataFromStorage();
        setCurrentUser({ ...currentUser, name: res.name, email: res.email })
        saveDataToStorage();
        history.goBack();
        handleInfo('Успех!', 'профиль успешно изменён', false);
      })
      .catch((err) => {
        if (err.status && err.status === 409 ) {
          handleInfo('Ошибка изменения профиля', 'Пользователь с такими данными уже существует');
        } else if (err.status && err.status === 400) {
          handleInfo('Ошибка изменения профиля', 'Проверьте формат данных');
        } else {
          handleInfo('Ошибка изменения профиля', 'Ошибка выполнения команды. Попробуйте снова.');
        }
      })
      .finally(() => {SetIsProfileBlocked(false)})
  }

  // обработчики функциональности карточек
  function handleSaveMovie(movieData) {
    MainApiInstance.saveMovie(movieData)
      .then((newMovie) => {
        setSavedMoviesData([...savedMoviesCards, newMovie]);
      })
      .catch((err) => {
        handleInfo('Ошибка сохраненения фильма', err.message);
      })
  }

  function handleRemoveMovie(id) {
    MainApiInstance.removeMovie(id)
      .then((res) => {
        setSavedMoviesData(savedMoviesData.filter((item) => item._id !== id));
      })
      .catch((err) => {
        handleInfo('Ошибка удаления фильма', err.message);
      })
  }

  // фильтрация данных
  function filterMovies(movies, request, filterState, savedMode = false) {
    if (!request && !savedMode) {
      return [];
    }

    let filteredMovies = movies;
    if (filterState) {
      filteredMovies = filteredMovies.filter((item) => {
        return item.duration <= SHORT_MOVIE_DURATION_THRESHOLD;
      });
    }

    if (request) {
      const loweredReques = request.toLowerCase();
      filteredMovies = filteredMovies.filter((item) => {
        return (item.nameRU && item.nameRU.toLowerCase().includes(loweredReques))
          || (item.nameEN && item.nameEN.toLowerCase().includes(loweredReques));
      });
    }

    return filteredMovies
  }

  // главная страница
  React.useEffect(() => {
    SetIsPreloaderActive(true);
    setMoviesCards(filterMovies(moviesData, moviesSearchRequest, moviesFilterState));
    SetIsPreloaderActive(false);
  }, [moviesData, moviesSearchRequest, moviesFilterState])

  // сохранённые фильмы
  React.useEffect(() => {
    SetIsPreloaderActive(true);
    setSavedMoviesCards(filterMovies(savedMoviesData, savedMoviesSearchRequest, savedMoviesFilterState, true));
    SetIsPreloaderActive(false);
  }, [savedMoviesData, savedMoviesSearchRequest, savedMoviesFilterState])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path='/movies' component={Movies}
          moviesCards={moviesCards.slice(0, showMoviesCount)}
          savedMovieIds={savedMovieIds}

          searchRequest={moviesSearchRequest}
          handleSearchRequest={handleMoviesSearchRequest}

          filterState={moviesFilterState}
          handleFilterStateChange={handleMoviesFilterStateChange}

          cardsColumns={windowWidthSettings.columns}
          isMoreButtonActive={isMovieMoreButtonActive}
          handleMoreButton={handleMovieMoreButton}
          handleSaveMovie={handleSaveMovie}
          handleRemoveMovie={handleRemoveMovie}

          isPreloaderActive={isPreloaderActive}
          info={info}
        />
        <ProtectedRoute exact path='/saved-movies' component={Movies}
            savedMode={true}

            moviesCards={savedMoviesCards}
            savedMovieIds={savedMovieIds}

            searchRequest={savedMoviesSearchRequest}
            handleSearchRequest={handleSavedMoviesSearchRequest}

            filterState={savedMoviesFilterState}
            handleFilterStateChange={handleSavedMoviesFilterStateChange}

            cardsColumns={windowWidthSettings.columns}

            handleSaveMovie={handleSaveMovie}
            handleRemoveMovie={handleRemoveMovie}

            isPreloaderActive={isPreloaderActive}
            info={info}
        />

        <ProtectedRoute exact path='/profile' component={Profile}
          handleLogout={handleLogout}
          handleEditProfile={handleEditProfile}
          info={info}
          isInputBlocked={isProfileBlocked}
        />
        <Route exact path='/signin'>
          <Login handleLogin={handleLogin} info={info} isInputBlocked={isLoginBlocked}/>
        </Route>
        <Route exact path='/signup'>
          <Register handleRegister={handleRegister} info={info} isInputBlocked={isRegisterBlocked}/>
        </Route>
        <Route exact path='/'>
          <Main info={info} />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

function App() {
  return (<BrowserRouter><AppInternal /></BrowserRouter>)
}

export default App;
