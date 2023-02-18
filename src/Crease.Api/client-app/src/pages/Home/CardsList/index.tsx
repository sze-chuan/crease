import React from 'react';
import Card from './Card';
import AddCard from './AddCard';
import { ICardDto } from '../../../api/apiClient';

import { StyledDiv } from './styles';
export interface CardsListProps {
  cards: ICardDto[] | null;
}

const CardsList = ({ cards }: CardsListProps): JSX.Element => {
  const cardsComponents = cards
    ? cards.map((card) => {
        return <Card card={card} key={card.id} />;
      })
    : null;

  return (
    <StyledDiv>
      {cardsComponents}
      <AddCard />
    </StyledDiv>
  );
};

export default CardsList;
