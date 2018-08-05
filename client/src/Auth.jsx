import React from 'react';
import decode from 'jwt-decode';
const checkAuth = () => {
  const token = localStorage.getItem('Meteor.loginToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(token);
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(refreshToken);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

// const AuthRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)}
//   />
// );
