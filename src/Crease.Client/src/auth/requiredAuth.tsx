import React from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from './authConfig';

interface RequiredAuthInterface {
  children: JSX.Element;
}

const RequiredAuth = ({ children }: RequiredAuthInterface): JSX.Element => {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={loginRequest}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
};

export default RequiredAuth;
