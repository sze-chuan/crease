import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdapterDayFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import LandingPage from './components/LandpingPage';
import Home from './pages/Home';
import RequiredAuth from './auth/requiredAuth';
import { ToastProvider } from './contexts/toastContext';

const App = (): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayFns}>
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
        </Routes>
      </ToastProvider>
    </LocalizationProvider>
  );
};

export default App;
