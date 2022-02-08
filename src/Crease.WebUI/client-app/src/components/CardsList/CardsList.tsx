import React from 'react';
import Card from '../Card';
import { ICardDto } from '../../web-api-client';
export interface CardsListProps {
  cards: ICardDto[] | null;
}

const CardsList = ({ cards }: CardsListProps): JSX.Element => {
  const cardsComponents = cards
    ? cards.map((card) => {
        return <Card key={card.id} card={card} />;
      })
    : null;

  return (
    <React.Fragment>
      {cardsComponents}
      <Card key="addCard" />
    </React.Fragment>
  );
};

export default CardsList;
