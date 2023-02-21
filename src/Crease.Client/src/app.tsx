import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import LandingPage from './components/LandpingPage';
import TransactionDialog from './components/AddTransactionDialog';
import Home from './pages/Home';
import Card from './pages/Card';
import RequiredAuth from './auth/requiredAuth';
import { ToastProvider } from './contexts/toastContext';

const App = (): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastProvider>
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
      </ToastProvider>
    </LocalizationProvider>
  );
};

export default App;
