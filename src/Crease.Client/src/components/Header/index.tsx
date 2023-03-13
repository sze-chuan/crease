import React from 'react';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';

import AppBar from '@mui/material/AppBar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import * as S from './styles';

const Header = (): JSX.Element => {
  const { instance, accounts } = useMsal();
  const user = accounts[0];
  const homePageLink = user ? '/home' : '/';

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => instance.loginRedirect(loginRequest);
  const logout = () => instance.logoutRedirect();

  return (
    <header>
      <AppBar position="static">
        <S.StyledToolBar>
          <Link to={homePageLink}>
            <CreditCardIcon sx={{ color: 'white' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <React.Fragment>
              <S.HeaderButton onClick={handleClick}>{user.name}</S.HeaderButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <S.HeaderButton variant="contained" onClick={() => login()}>
              Login
            </S.HeaderButton>
          )}
        </S.StyledToolBar>
      </AppBar>
    </header>
  );
};

export default Header;
