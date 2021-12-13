import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';

import * as S from './styles';

const Header = (): JSX.Element => {
  return (
    <header>
      <AppBar position="static">
        <S.StyledToolBar>
          <Link to="/">
            <CreditCardIcon sx={{ color: 'white' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <S.LoginButton variant="contained">Login</S.LoginButton>
        </S.StyledToolBar>
      </AppBar>
    </header>
  );
};

export default Header;
