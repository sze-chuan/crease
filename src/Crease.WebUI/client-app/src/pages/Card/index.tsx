import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Layout from '../../components/Layout';
import CardDetails from './CardDetails';
import { getBankCards, getCards } from '../../store/cards/cardSlice';

const Card = (): JSX.Element => {
  const { id } = useParams();
  const cards = useSelector(getCards);
  const bankCards = useSelector(getBankCards);
  const card = cards.find((x) => x.id === id);
  const bankCard = bankCards.find((x) => x.id === card?.bankCardId);

  return (
    <Layout>
      <Stack>
        {card && bankCard ? (
          <CardDetails card={card} bankCard={bankCard}></CardDetails>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Stack>
    </Layout>
  );
};

export default Card;
