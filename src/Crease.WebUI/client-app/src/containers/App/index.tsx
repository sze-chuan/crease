import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';
import LandingPage from '../../components/LandpingPage';
import Home from '../Home';
import StyledContainer from './styles';

const App = (): JSX.Element => {
  return (
    <StyledContainer>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </StyledContainer>
  );
};

export default App;
