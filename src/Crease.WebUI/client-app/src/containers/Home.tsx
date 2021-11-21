import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { CardsList } from '../components/CardsList';
import { CardDto } from '../web-api-client';

export const Home = (): JSX.Element => {
  const [cards, setCards] = useState<CardDto[] | null>(null);

  useEffect(() => {
    setCards([{ id: '1', name: 'frank', bankCardId: '1' } as CardDto]);
  }, []);

  return (
    <section className="home">
      <Box />
      <CardsList cards={cards} />
    </section>
  );
};
