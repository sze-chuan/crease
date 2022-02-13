import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from '../../components/Layout';
import { getCards } from '../../store/cards/cardSlice';

const Card = (): JSX.Element => {
  const { id } = useParams();
  const cards = useSelector(getCards);
  const card = cards.find((x) => x.id === id);

  return (
    <Layout>
      <div>{card?.name}</div>
    </Layout>
  );
};

export default Card;
