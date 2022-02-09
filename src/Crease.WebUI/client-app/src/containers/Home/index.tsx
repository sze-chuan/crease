import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import CardsList from '../../components/CardsList/CardsList';
import CardDialog from '../../components/CardDialog';
import { CardsClient, BankCardsClient } from '../../web-api-client';
import { loadBankCards, loadCards, getCards } from '../../slices/cardSlice';
import StyledSection from './styles';
import { useAuth } from '../../auth/authContext';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCards);
  const { acquireToken } = useAuth();

  useEffect(() => {
    const fetchBankCardsData = async () => {
      const bankCardsClient = new BankCardsClient(
        process.env.REACT_APP_API_URL
      );
      const token = await acquireToken();
      bankCardsClient.setAuthToken(token);
      const result = await bankCardsClient.get();

      dispatch(loadBankCards(result));
    };

    const fetchCardsData = async () => {
      const cardsClient = new CardsClient(process.env.REACT_APP_API_URL);
      const token = await acquireToken();
      cardsClient.setAuthToken(token);
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
      <CardDialog />
    </StyledSection>
  );
};

export default Home;
