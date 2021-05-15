import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';


function AppInternal() {
  return (
      <Switch>
        <Route exact path='/movies'>
          <Movies/>
        </Route>
        <Route exact path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path='/signin'>
          <Login/>
        </Route>
        <Route exact path='/signup'>
          <Register/>
        </Route>
        <Route exact path='/'>
          <Main/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
  );
}

function App() {
  return (<BrowserRouter><AppInternal /></BrowserRouter>)
}

export default App;
