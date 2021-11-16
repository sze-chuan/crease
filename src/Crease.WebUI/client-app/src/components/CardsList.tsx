import React from 'react';
import { Card } from '../components/Card';
import { CardDto } from '../web-api-client';

export interface CardsListProps {
  cards: CardDto[] | null;
}

export const CardsList = ({ cards }: CardsListProps): JSX.Element => {
  const cardsComponents = cards
    ? cards.map((card) => {
        return <Card key={card.id} card={card} />;
      })
    : null;

  return <React.Fragment>{cardsComponents}</React.Fragment>;
};
