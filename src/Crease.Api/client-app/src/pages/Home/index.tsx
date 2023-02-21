import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout';
import AddTransaction from '../../components/AddTransaction';

import CardsList from './CardsList';
import CardDialog from './CardDialog';
import { GetCardsClient, GetBankCardsClient } from '../../api/apiClient';
import { loadBankCards, loadCards, getCards } from '../../slices/card';
import { useAuth } from '../../auth/authContext';
import * as S from './styles';
import homeImage from '../../assets/home.png';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCards);
  const { acquireToken } = useAuth();

  useEffect(() => {
    const fetchBankCardsData = async () => {
      const getBankCardsClient = new GetBankCardsClient(
        process.env.REACT_APP_API_URL
      );
      const token = await acquireToken();
      getBankCardsClient.setAuthToken(token);
      const result = await getBankCardsClient.get();

      if (result.bankCards) {
        dispatch(loadBankCards(result.bankCards));
      }
    };

    const fetchCardsData = async () => {
      const cardsClient = new GetCardsClient(process.env.REACT_APP_API_URL);
      const token = await acquireToken();
      cardsClient.setAuthToken(token);
      const result = await cardsClient.list();

      if (result.cards) {
        dispatch(loadCards(result.cards));
      }
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
