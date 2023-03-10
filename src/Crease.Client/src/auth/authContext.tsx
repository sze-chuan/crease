import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { loginRequest, msalConfig, tokenRequest } from './authConfig';

interface AuthContextInterface {
  user: AccountInfo | null;
  token: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  acquireToken: () => Promise<string>;
}

interface AuthProviderInterface {
  children: React.ReactNode;
}

interface IdTokenClaims {
  exp: number;
}

const initialContextValue = {
  user: null,
  token: '',
  login: async (): Promise<void> => void 0,
  logout: async (): Promise<void> => void 0,
  acquireToken: async (): Promise<string> => '',
};

const AuthContext = createContext<AuthContextInterface>(initialContextValue);

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: AuthProviderInterface): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [token, setToken] = useState<string>('');
  const [publicClient, setPublicClient] = useState<PublicClientApplication>();

  useEffect(() => {
    const initializeAuthContext = async () => {
      const pca = new PublicClientApplication(msalConfig);
      const accounts = pca.getAllAccounts();

      if (
        accounts?.length &&
        accounts.length > 0 &&
        accounts[0].idTokenClaims
      ) {
        const idToken = accounts[0].idTokenClaims as IdTokenClaims;
        const currentTime = new Date().getTime() / 1000;
        if (idToken.exp < currentTime) {
          await pca.logoutRedirect();
        } else {
          pca?.setActiveAccount(accounts[0]);
          setUser(accounts[0]);
        }
      }

      setPublicClient(pca);
    };

    initializeAuthContext();
  }, []);

  const login = async (): Promise<void> => {
    try {
      const result = await publicClient?.loginPopup(loginRequest);

      if (result) {
        publicClient?.setActiveAccount(result.account);
        setUser(result.account);
        setToken(result.accessToken);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Login completed');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await publicClient?.logoutRedirect();
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Logout completed');
    }
  };

  const acquireToken = async (): Promise<string> => {
    let token = '';

    try {
      if (user) {
        const result = await publicClient?.acquireTokenSilent(tokenRequest);
        if (result) {
          setToken(result.accessToken);
          token = result.accessToken;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Accquire token completed');
    }

    return Promise.resolve(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, acquireToken }}>
      {children}
    </AuthContext.Provider>
  );
};
