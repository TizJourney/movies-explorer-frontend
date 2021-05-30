import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

import { CurrentUserContext, userPlaceholderData } from '../../contexts/CurrentUserContext';

import { useHistory } from 'react-router-dom';

import { MoviesApiInstance } from '../../utils/MoviesApi';

function AppInternal() {

  const history = useHistory();
  const userContext = React.useContext(CurrentUserContext);

  const [moviesData, setMoviesData] = React.useState([]);
  const [showMoviesCount, setMoviesCount] = React.useState(8);
  const [moviesCards, setMoviesCards] = React.useState([]);

  const [moviesSearchRequest, setMoviesSearchRequest] = React.useState('');
  const [moviesFilterState, setMoviesFilterState] = React.useState(true);

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

  const handleMoviesSearchRequest = (request) => {
    setMoviesSearchRequest(request);
  }

  const handleMoviesFilterStateChange = (newState) => {
    setMoviesFilterState(newState);
  }


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

  React.useEffect(() => {
    setMoviesCards(moviesData.slice(0, showMoviesCount));
  }, [showMoviesCount, moviesData]);


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
          />
        </Route>
        <Route exact path='/saved-movies'>
        <Movies
          savedMode={true}
          handleCardClick={handleCardClick}
          moviesCards={moviesCards}
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
