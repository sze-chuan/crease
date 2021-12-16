import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { CardsList } from '../../components/CardsList';
import { AddCardDialog } from '../../components/AddCardDialog';
import { CardsClient, BankCardsClient } from '../../web-api-client';
import { loadBankCards, loadCards, getCards } from '../../slices/cardSlice';
import StyledSection from './styles';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCards);

  useEffect(() => {
    const fetchBankCardsData = async () => {
      const bankCardsClient = new BankCardsClient(process.env.PUBLIC_URL);
      const result = await bankCardsClient.get();

      dispatch(loadBankCards(result));
    };

    const fetchCardsData = async () => {
      const cardsClient = new CardsClient(process.env.PUBLIC_URL);
      const result = await cardsClient.getAll();

      dispatch(loadCards(result));
    };

    fetchBankCardsData();
    fetchCardsData();
  }, []);

  return (
    <StyledSection>
      <Box />
      <CardsList cards={cards} />
      <AddCardDialog />
    </StyledSection>
  );
};

export default Home;
