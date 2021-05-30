import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

import WindowWidthSettings from '../WindowWidthSettings/WindowWidthSettings';

import { CurrentUserContext, userPlaceholderData } from '../../contexts/CurrentUserContext';

import { useHistory } from 'react-router-dom';

import { MoviesApiInstance } from '../../utils/MoviesApi';

function AppInternal() {

  const history = useHistory();
  const userContext = React.useContext(CurrentUserContext);

  // состояние окна
  const windowWidthSettings = WindowWidthSettings();

  // это состояния фильтрации страницы movies
  const [moviesData, setMoviesData] = React.useState([]);
  const [showMoviesCount, setMoviesCount] = React.useState(windowWidthSettings.default);
  const [moviesSearchRequest, setMoviesSearchRequest] = React.useState('');
  const [moviesFilterState, setMoviesFilterState] = React.useState(true);

  // это результат фильтрации для страницы movies
  const [moviesCards, setMoviesCards] = React.useState([]);

  // обработчики функциональности авторизации
  const handleLogin = () => {
    userContext.logged = true;
    history.push('/movies');
  }

  const handleLogout = () => {
    userContext.logged = false;
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
  }

  const handleMoviesFilterStateChange = (newState) => {
    setMoviesFilterState(newState);
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

  React.useEffect(() => {
    initMoviesPage();
    // eslint-disable-next-line
  }, []);

  // фильтрация данных для главной страницы
  React.useEffect( () => {
    function filterMovies(movies, count, request, filterState) {
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

      return filteredMovies.slice(0, showMoviesCount)
    }

    setMoviesCards(filterMovies(moviesData, showMoviesCount, moviesSearchRequest, moviesFilterState));
}, [moviesData, showMoviesCount, moviesSearchRequest, moviesFilterState])

  return (
      <Switch>
        <Route exact path='/movies'>
          <Movies
            handleCardClick={handleCardClick}
            moviesCards={moviesCards}

            searchRequest={moviesSearchRequest}
            handleSearchRequest={handleMoviesSearchRequest}

            filterState={moviesFilterState}
            handleFilterStateChange={handleMoviesFilterStateChange}

            cardsColumns={windowWidthSettings.columns}
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
  return (<CurrentUserContext.Provider value={userPlaceholderData}><BrowserRouter><AppInternal /></BrowserRouter></CurrentUserContext.Provider>)
}

export default App;
