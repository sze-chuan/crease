import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Header = (): JSX.Element => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <CreditCardIcon sx={{ color: 'white' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button className="login-btn" variant="contained">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};
