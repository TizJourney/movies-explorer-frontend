import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

// компоненты страниц сайта
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

// компонента отслеживания ширины окна
import WindowWidthSettings from '../WindowWidthSettings/WindowWidthSettings';

// контекст для хранения состония пользователя
import { CurrentUserContext, USER_PLACEHOLDER_DATA } from '../../contexts/CurrentUserContext';

// работа с api и авторизацией
import { MoviesApiInstance } from '../../utils/MoviesApi';
import { MainApiInstance } from '../../utils/MainApi';
import { API_MOVIES_BASE_URL } from '../../utils/utils';
import { tokenHandlerInstance } from '../../utils/login-tools';

function AppInternal() {

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState(USER_PLACEHOLDER_DATA);

  // состояние окна
  const windowWidthSettings = WindowWidthSettings();

  // состояние прелоадера на странице фильмов
  const [isPreloaderActive, SetIsPreloaderActive] = React.useState(false);

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

  // работа с авторизацией
  function tokenCheckAndRedirect(redirect = null) {
    setCurrentUser({...currentUser, logged: false});
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
          return MainApiInstance.getMovies();
        })
        .then((moviesData) => {
          setSavedMoviesData(moviesData);
          if (redirect) {
            history.push(redirect);
          }
        })
        .catch((e) => {
          //todo: вывести ошибку
        })
        .finally(() => {
          SetIsPreloaderActive(false);
        })
    }
  }

  // обработчики функциональности карточки
  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }

  // обработчики функциональности фильтрации главной страницы фильмов
  const handleMoviesSearchRequest = (request) => {
    setMoviesSearchRequest(request);
    setShowMoviesCount(windowWidthSettings.default);
  }

  const handleMoviesFilterStateChange = (newState) => {
    setMoviesFilterState(newState);
  }

  const handleMovieMoreButton = () => {
    // кроме добавления нового ряда так же добавим карточки, чтобы они полностью занимали всю линию
    setShowMoviesCount(showMoviesCount + windowWidthSettings.grow + (windowWidthSettings.columns - Math.floor(showMoviesCount % windowWidthSettings.columns)) % windowWidthSettings.columns);
  }

  // обработчики функциональности фильтрации сохраннённых фильмов
  const handleSavedMoviesSearchRequest = (request) => {
    setSavedMoviesSearchRequest(request);
  }

  const handleSavedMoviesFilterStateChange = (newState) => {
    setSavedMoviesFilterState(newState);
  }


  // инициализация данных для главной страницы
  const initMoviesPage = () => {
    SetIsPreloaderActive(true);
    MoviesApiInstance.getMovies()
      .then((movies) => {
        if (movies) {
          const convertedMovies= movies.map((movieData) => {
            const movieImageUrl = movieData.image ? `${API_MOVIES_BASE_URL}${movieData.image.url}`: '';
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
          throw new Error('Не получилось скачать данные фильмов. Перезагрузите страницу.')
        }
      })
      .catch((e) => {
        //todo: вызвать обработчик ошибок
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
        //todo: добавить обработчик ошибок
      })
  }

  function handleLogin(email, password) {
    MainApiInstance.login(email, password)
      .then((res) => {
        tokenHandlerInstance.set(res.token);
        MainApiInstance.setToken(res.token);
        tokenCheckAndRedirect('/movies');
      })
      .catch((err) => {
        //todo: добавить обработчик ошибок
      })
  }

  function handleLogout() {
    tokenHandlerInstance.remove();
    setCurrentUser({...currentUser, logged: false})
    history.push('/');
  }

  const handleEditProfile = (values) => {
    MainApiInstance.updateUserInfo(values)
      .then((res) => {
        setCurrentUser({...currentUser, name: res.name, email: res.email})
        history.goBack();
      })
      .catch((err) => {
        //todo: добавить обработчик ошибок
      })
  }

  // обработчики функциональности карточек
  function handleSaveMovie(movieData) {
    MainApiInstance.saveMovie(movieData)
      .then((newMovie) => {
        setSavedMoviesData([...savedMoviesCards, newMovie]);
      })
      .catch((err) => {
        //todo: добавить обработчик ошибок
      })
  }

  function handleRemoveMovie(id) {
    MainApiInstance.removeMovie(id)
      .then((res) => {
        setSavedMoviesData(savedMoviesData.filter((item) => item._id !== id));
      })
      .catch((err) => {
        //todo: добавить обработчик ошибок
      })
  }

  // фильтрация данных
  function filterMovies(movies, request, filterState, savedMode=false) {
    if (!request && !savedMode) {
      return [];
    }

    let filteredMovies = movies;
    if (filterState) {
      filteredMovies = filteredMovies.filter((item) => {
        return item.duration <= 40;
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
        <Route exact path='/movies'>
          <Movies
            handleCardClick={handleCardClick}
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

          />
        </Route>
        <Route exact path='/saved-movies'>
          <Movies
            savedMode={true}

            handleCardClick={handleCardClick}
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
          />
        </Route>
        <Route exact path='/profile'>
          <Profile handleLogout={handleLogout} handleEditProfile={handleEditProfile} />
        </Route>
        <Route exact path='/signin'>
          <Login handleLogin={handleLogin} />
        </Route>
        <Route exact path='/signup'>
          <Register handleRegister={handleRegister} />
        </Route>
        <Route exact path='/'>
          <Main />
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
