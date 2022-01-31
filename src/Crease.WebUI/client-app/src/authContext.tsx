import React, { useState, useEffect, useContext, createContext } from 'react';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { loginRequest, msalConfig } from './authConfig';
import { useNavigate } from 'react-router-dom';

interface AuthContextInterface {
  user: AccountInfo | null;
  login: () => Promise<void>;
}

interface AuthProviderInterface {
  children: React.ReactNode;
}

const initialContextValue = {
  user: null,
  login: async (): Promise<void> => void 0,
};

const AuthContext = createContext<AuthContextInterface>(initialContextValue);

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: AuthProviderInterface): JSX.Element => {
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClientApplication>();

  const navigate = useNavigate();

  useEffect(() => {
    const pca = new PublicClientApplication(msalConfig);
    const accounts = pca.getAllAccounts();

    if (accounts?.length && accounts.length > 0) {
      pca?.setActiveAccount(accounts[0]);
      setUser(accounts[0]);
      navigate('/home', { replace: true });
    }

    setPublicClient(pca);
  }, []);

  const login = async (): Promise<void> => {
    try {
      await publicClient?.loginPopup(loginRequest);

      const accounts = publicClient?.getAllAccounts();

      if (accounts?.length && accounts.length > 0) {
        publicClient?.setActiveAccount(accounts[0]);
        setUser(accounts[0]);
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(user?.name);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
