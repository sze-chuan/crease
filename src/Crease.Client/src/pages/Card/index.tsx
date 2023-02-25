import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Layout from '../../components/Layout';
import CardDetails from './CardDetails';
import CardStatement from './CardStatement';
import AddTransaction from '../../components/AddTransaction';
import { getBankCards, getCards } from '../../slices/card';

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
          <React.Fragment>
            <CardDetails card={card} bankCard={bankCard}></CardDetails>
            <CardStatement />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Stack>
      <AddTransaction card={card} />
    </Layout>
  );
};

export default Card;
