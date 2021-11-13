import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Header: React.FC = () => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <CreditCardIcon sx={{ color: 'white' }} />
          </a>
          <Box sx={{ flexGrow: 1 }} />
          <Button className="login-btn" variant="contained">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};
