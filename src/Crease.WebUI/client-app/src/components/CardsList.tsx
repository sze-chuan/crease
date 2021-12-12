import React from 'react';
import { Card } from '../components/Card';
import { ICardDto } from '../web-api-client';
export interface CardsListProps {
  cards: ICardDto[] | null;
}

export const CardsList = ({ cards }: CardsListProps): JSX.Element => {
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
