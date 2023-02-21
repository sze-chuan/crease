import React from 'react';

import Header from '../Header';
import { StyledContainer, StyledBox } from './styles';

export interface LayoutProps {
  isLandingPage: boolean;
  children: React.ReactNode;
}

const Layout = ({ children, isLandingPage }: LayoutProps): JSX.Element => {
  return (
    <StyledContainer>
      <Header />
      {isLandingPage ? children : <StyledBox>{children}</StyledBox>}
    </StyledContainer>
  );
};

Layout.defaultProps = {
  isLandingPage: false,
};

export default Layout;
