import React from 'react';
import Layout from '../Layout';
import * as S from './styles';

const LandingPage = (): JSX.Element => {
  return (
    <Layout isLandingPage={true}>
      <S.StyledSection>
        <S.StyledH1>Maximise your rewards</S.StyledH1>
        <S.StyledTypography variant="body1">
          Track your credit card rewards with ease
        </S.StyledTypography>
        <S.StyledGetStartedBtn variant="outlined">
          Get Started
        </S.StyledGetStartedBtn>
      </S.StyledSection>
    </Layout>
  );
};

export default LandingPage;
