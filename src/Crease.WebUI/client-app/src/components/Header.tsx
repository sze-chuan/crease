import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const Header: React.FC = () => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <span>Crease</span>
        </Toolbar>
      </AppBar>
    </header>
  );
};
