import React from 'react';
import { useAuth } from './authContext';

interface RequiredAuthInterface {
  children: JSX.Element;
}

const RequiredAuth = ({ children }: RequiredAuthInterface): JSX.Element => {
  const { user, login } = useAuth();

  if (!user) {
    login();
    return <React.Fragment></React.Fragment>;
  }

  return children;
};

export default RequiredAuth;
