import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const LandingPage = (): JSX.Element => {
  return (
    <section className="landing-page">
      <h1>Maximise your rewards</h1>
      <Typography variant="body1">
        Track your credit card rewards with ease
      </Typography>
      <Button className="get-started-btn" variant="outlined">
        Get Started
      </Button>
    </section>
  );
};
