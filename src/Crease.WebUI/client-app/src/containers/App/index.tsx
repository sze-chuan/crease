import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdapterDayFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Header from '../../components/Header';
import LandingPage from '../../components/LandpingPage';
import Home from '../Home';
import StyledContainer from './styles';

const App = (): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayFns}>
      <StyledContainer>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </StyledContainer>
    </LocalizationProvider>
  );
};

export default App;
