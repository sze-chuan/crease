import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout';
import AddTransaction from '../../components/AddTransaction';

import CardsList from './CardsList';
import CardDialog from './CardDialog';
import { GetCardsClient, GetBankCardsClient } from '../../api/apiClient';
import { loadBankCards, loadCards, getCards } from '../../slices/card';

import * as S from './styles';
import homeImage from '../../assets/home.png';
import { TransactionDialogAction } from '../../types';
import { tokenUtils } from '../..';
import { useLoading } from '../../contexts/loadingContext';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCards);
  const { setLoading } = useLoading();

  useEffect(() => {
    let bankCardsFetched = false;
    let cardsFetched = false;

    const isLoadingComplete = () => {
      if (bankCardsFetched && cardsFetched) {
        setLoading(false);
      }
    };

    const fetchBankCardsData = async () => {
      const getBankCardsClient = new GetBankCardsClient(
        tokenUtils,
        process.env.REACT_APP_API_URL
      );
      const result = await getBankCardsClient.get();

      if (result.bankCards) {
        dispatch(loadBankCards(result.bankCards));
      }

      bankCardsFetched = true;
      isLoadingComplete();
    };

    const fetchCardsData = async () => {
      const cardsClient = new GetCardsClient(
        tokenUtils,
        process.env.REACT_APP_API_URL
      );
      const result = await cardsClient.list();

      if (result.cards) {
        dispatch(loadCards(result.cards));
      }

      cardsFetched = true;
      isLoadingComplete();
    };

    setLoading(true);
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
        <AddTransaction action={TransactionDialogAction.AddFromHome} />
      </S.StyledContainerDiv>
      <CardDialog />
    </Layout>
  );
};

export default Home;
