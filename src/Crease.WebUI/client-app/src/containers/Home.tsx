import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { CardsList } from '../components/CardsList';
import { CardDto } from '../web-api-client';

export const Home = (): JSX.Element => {
  const [cards, setCards] = useState<CardDto[] | null>([
    { id: '1', name: 'test', bankCardId: '1' } as CardDto,
  ]);

  return (
    <section className="home">
      <Box />
      <CardsList cards={cards} />
    </section>
  );
};
