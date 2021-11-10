import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import { LandingPage } from '../components/LandingPage';
import { Home } from './Home';
import Container from '@mui/material/Container';

export const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;
