import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { CardsList } from '../components/CardsList';
import { CardDto } from '../web-api-client';

export const Home = (): JSX.Element => {
  const [cards, setCards] = useState<CardDto[] | null>(null);

  return (
    <section className="home">
      <Box />
      <CardsList cards={cards} />
    </section>
  );
};
