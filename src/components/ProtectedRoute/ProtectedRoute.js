import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ component: Component, ...props  }) => {

  const currentUser = React.useContext(CurrentUserContext);
  return (
    <Route>
      {
        () => currentUser.logged ? <Component {...props} /> : <Redirect to='/signin' />
      }
    </Route>
)}

export default ProtectedRoute;
