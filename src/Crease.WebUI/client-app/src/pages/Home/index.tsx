import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout';
import AddTransaction from '../../components/AddTransaction';
import CardsList from './CardsList';
import CardDialog from './CardDialog';
import { CardsClient, BankCardsClient } from '../../api/apiClient';
import {
  loadBankCards,
  loadCards,
  getCards,
} from '../../store/cards/cardSlice';
import { useAuth } from '../../auth/authContext';
import * as S from './styles';
import homeImage from '../../assets/home.png';

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
    <Layout isLandingPage={true}>
      <img src={homeImage} />
      <S.StyledContainerDiv>
        <Typography variant="h6" fontWeight="bolder" paragraph={true}>
          Your credit cards
        </Typography>
        <CardsList cards={cards} />
        <AddTransaction />
      </S.StyledContainerDiv>
      <CardDialog />
    </Layout>
  );
};

export default Home;
