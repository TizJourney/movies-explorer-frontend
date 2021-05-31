import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

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

import { useHistory } from 'react-router-dom';

// работа с api и авторизацией
import { MoviesApiInstance } from '../../utils/MoviesApi';
import { MainApiInstance } from '../../utils/MainApi';
import { tokenHandlerInstance } from '../../utils/login-tools';

function AppInternal() {

  const history = useHistory();
  const currentUser = React.useContext(CurrentUserContext);

  // работа с авторизацией
  const tokenCheck = () => {
    currentUser.logged = false;
    const jwt = tokenHandlerInstance.get();
    if (jwt) {
      MainApiInstance.setToken(jwt);
      MainApiInstance.getUserInfo(jwt)
        .then((res) => {
          if (res) {
            currentUser.name = res.name
            currentUser.email = res.email
            currentUser.logged = true;
          }
        })
        .catch((e) => {
          //todo: вывести ошибку
        })
    }
  }

  // состояние окна
  const windowWidthSettings = WindowWidthSettings();

  // это состояния фильтрации страницы movies
  const [moviesData, setMoviesData] = React.useState([]);
  const [showMoviesCount, setShowMoviesCount] = React.useState(windowWidthSettings.default);
  const [moviesSearchRequest, setMoviesSearchRequest] = React.useState('');
  const [moviesFilterState, setMoviesFilterState] = React.useState(false);

  // это результат фильтрации для страницы movies
  const [moviesCards, setMoviesCards] = React.useState([]);
  const isMovieMoreButtonActive = showMoviesCount < moviesCards.length;

  // обработчики функциональности авторизации
  const handleLogin = () => {
    currentUser.logged = true;
    history.push('/movies');
  }

  const handleLogout = () => {
    currentUser.logged = false;
    history.push('/');
  }

  const handleEditProfile = () => {
    history.goBack();
  }

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }

  // обработчики функциональности фильтрации главной страницы
  const handleMoviesSearchRequest = (request) => {
    setMoviesSearchRequest(request);
    setShowMoviesCount(windowWidthSettings.default);
  }

  const handleMoviesFilterStateChange = (newState) => {
    setMoviesFilterState(newState);
  }

  const handleMovieMoreButton = () => {
    // кроме добавления нового ряда так же добавим карточки, чтобы они полностью занимали всю линию
    setShowMoviesCount(showMoviesCount + windowWidthSettings.grow + (windowWidthSettings.columns - Math.floor(showMoviesCount % windowWidthSettings.columns)) % windowWidthSettings.columns) ;
  }

  // инициализация данных для главной страницы
  const initMoviesPage = () => {
    MoviesApiInstance.getMovies()
      .then((movies) => {
        if (movies) {
          setMoviesData(movies);
        }
        else {
          throw new Error('Не получилось скачать данные фильмов. Перезагрузите страницу.')
        }
      })
      .catch((e) => {
        //вызвать обработчик ошибок
        console.log(e);
      })
  }

  // инициализация данных при старте приложения
  React.useEffect(() => {
      tokenCheck();
      initMoviesPage();
    // eslint-disable-next-line
  }, []);

  // фильтрация данных для главной страницы
  React.useEffect( () => {
    function filterMovies(movies, request, filterState) {
      if (!request) {
        return [];
      }

      let filteredMovies = movies;
      if (filterState) {
        filteredMovies = filteredMovies.filter( (item) => {
          return item.duration <= 40;
        });
      }

      if (request) {
        const loweredReques = request.toLowerCase();
        filteredMovies = filteredMovies.filter( (item) => {
          return (item.nameRU && item.nameRU.toLowerCase().includes(loweredReques))
            || (item.nameEN && item.nameEN.toLowerCase().includes(loweredReques));
        });
      }

      return filteredMovies
    }

    setMoviesCards(filterMovies(moviesData, moviesSearchRequest, moviesFilterState));
}, [moviesData, moviesSearchRequest, moviesFilterState])

  return (
      <Switch>
        <Route exact path='/movies'>
          <Movies
            handleCardClick={handleCardClick}
            moviesCards={moviesCards.slice(0, showMoviesCount)}

            searchRequest={moviesSearchRequest}
            handleSearchRequest={handleMoviesSearchRequest}

            filterState={moviesFilterState}
            handleFilterStateChange={handleMoviesFilterStateChange}

            cardsColumns={windowWidthSettings.columns}
            isMoreButtonActive={isMovieMoreButtonActive}
            handleMoreButton={handleMovieMoreButton}
          />
        </Route>
        <Route exact path='/saved-movies'>
        <Movies
          savedMode={true}
          handleCardClick={handleCardClick}
          moviesCards={moviesCards}
          cardsColumns={windowWidthSettings.columns}
        />
        </Route>
        <Route exact path='/profile'>
          <Profile handleLogout={handleLogout} handleEditProfile={handleEditProfile} />
        </Route>
        <Route exact path='/signin'>
          <Login handleSubmit={handleLogin} />
        </Route>
        <Route exact path='/signup'>
          <Register  handleSubmit={handleLogin} />
        </Route>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>

  );
}

function App() {
  return (<CurrentUserContext.Provider value={USER_PLACEHOLDER_DATA}><BrowserRouter><AppInternal /></BrowserRouter></CurrentUserContext.Provider>)
}

export default App;
