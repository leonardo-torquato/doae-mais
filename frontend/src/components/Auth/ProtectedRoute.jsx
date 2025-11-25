import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    // TODO: exibir um spinner aqui enquanto verifica o token
    return <div className="home-wrapper">Carregando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;