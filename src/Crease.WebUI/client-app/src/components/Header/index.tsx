import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';

import * as S from './styles';
import { useAuth } from '../../authContext';

const Header = (): JSX.Element => {
  const { login, user } = useAuth();
  const homePageLink = user ? '/home' : '/';

  return (
    <header>
      <AppBar position="static">
        <S.StyledToolBar>
          <Link to={homePageLink}>
            <CreditCardIcon sx={{ color: 'white' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <S.LoginButton variant="contained">{user.name}</S.LoginButton>
          ) : (
            <S.LoginButton variant="contained" onClick={() => login()}>
              Login
            </S.LoginButton>
          )}
        </S.StyledToolBar>
      </AppBar>
    </header>
  );
};

export default Header;
