import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MsalProvider } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';

import LandingPage from './components/LandpingPage';
import TransactionDialog from './components/AddTransactionDialog';
import Home from './pages/Home';
import Card from './pages/Card';
import RequiredAuth from './auth/requiredAuth';
import { ToastProvider } from './contexts/toastContext';
import { LoadingProvider } from './contexts/loadingContext';
import { LoadingSpinner } from './components/LoadingSpinner';

interface AppProps {
  pca: IPublicClientApplication;
}

const App = ({ pca }: AppProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MsalProvider instance={pca}>
        <ToastProvider>
          <LoadingProvider>
            <LoadingSpinner />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="home"
                element={
                  <RequiredAuth>
                    <Home />
                  </RequiredAuth>
                }
              />
              <Route path="card/:id" element={<Card />} />
            </Routes>
            <TransactionDialog />
          </LoadingProvider>
        </ToastProvider>
      </MsalProvider>
    </LocalizationProvider>
  );
};

export default App;
