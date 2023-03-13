import {
  Configuration,
  LogLevel,
  BrowserCacheLocation,
  SilentRequest,
  RedirectRequest,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

const b2cAuthorityUri =
  'https://creasead.onmicrosoft.com/f2eb91dd-d222-4d0a-8824-f92a16575f50';
const apiScopes = [
  `${b2cAuthorityUri}/bankcard.read`,
  `${b2cAuthorityUri}/card.write`,
  `${b2cAuthorityUri}/card.read`,
  `${b2cAuthorityUri}/cardstatement.write`,
  `${b2cAuthorityUri}/cardstatement.read`,
  `${b2cAuthorityUri}/transaction.write`,
  `${b2cAuthorityUri}/transaction.read`,
  `${b2cAuthorityUri}/transaction.delete`,
];

export const b2cPolicies = {
  names: {
    signUpSignIn: 'b2c_1_susi',
    editProfile: 'b2c_1_edit',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://creasead.b2clogin.com/creasead.onmicrosoft.com/b2c_1_susi',
    },
    editProfile: {
      authority:
        'https://creasead.b2clogin.com/creasead.onmicrosoft.com/b2c_1_edit',
    },
  },
  authorityDomain: 'creasead.b2clogin.com',
};

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: '7509f265-77f0-40c6-873d-cc002da7166f',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: `${process.env.REACT_APP_PUBLIC_URL}`,
    postLogoutRedirectUri: `${process.env.REACT_APP_PUBLIC_URL}`,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: apiScopes,
  redirectStartPage: `${process.env.REACT_APP_PUBLIC_URL}/home`,
};

export const tokenRequest: SilentRequest = {
  scopes: apiScopes,
};
