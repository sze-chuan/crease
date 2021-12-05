import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { CardsList } from '../components/CardsList';
import {
  CardDto,
  CardsClient,
  BankCardsClient,
  BankCardDto,
} from '../web-api-client';

export const Home = (): JSX.Element => {
  const [bankCards, setBankCards] = useState([] as BankCardDto[]);
  const [cards, setCards] = useState([] as CardDto[]);

  useEffect(() => {
    const fetchBankCardsData = async () => {
      const bankCardsClient = new BankCardsClient(process.env.PUBLIC_URL);
      const result = await bankCardsClient.get();

      setBankCards(result);
    };

    const fetchCardsData = async () => {
      const cardsClient = new CardsClient(process.env.PUBLIC_URL);
      const result = await cardsClient.getAll();

      setCards(result);
    };

    fetchBankCardsData();
    fetchCardsData();
  }, []);

  return (
    <section className="home">
      <Box />
      <CardsList cards={cards} />
    </section>
  );
};
