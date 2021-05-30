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

function AppInternal() {

  const history = useHistory();
  const userContext = React.useContext(CurrentUserContext);

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

  return (
      <Switch>
        <Route exact path='/movies'>
          <Movies
            handleCardClick={handleCardClick}
          />
        </Route>
        <Route exact path='/saved-movies'>
        <Movies
          savedMode={true}
          handleCardClick={handleCardClick}
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
