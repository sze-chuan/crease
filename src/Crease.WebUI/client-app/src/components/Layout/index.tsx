import React from 'react';

import Header from '../Header';
import StyledContainer from './styles';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <StyledContainer>
      <Header />
      {children}
    </StyledContainer>
  );
};

export default Layout;
