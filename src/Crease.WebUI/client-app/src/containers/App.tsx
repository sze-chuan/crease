import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import { LandingPage } from '../components/LandingPage';

import '../styles/App.css';

export const App: React.FC = () => {
  return (
    <section>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </section>
  );
};

export default App;
