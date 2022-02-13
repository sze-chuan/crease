import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Typography from '@mui/material/Typography';

import { IBankCardDto, ICardDto } from '../../../../api/apiClient';
import { getBankCards } from '../../../../store/cards/cardSlice';

import CardImage from '../../../../components/CardImage';
import * as S from './styles';

export interface CardProps {
  card: ICardDto | undefined;
}

const Card = ({ card }: CardProps): JSX.Element => {
  const bankCards: IBankCardDto[] = useSelector(getBankCards);
  const navigate = useNavigate();
  let bankCard: IBankCardDto | undefined;

  if (card) {
    bankCard = bankCards.find((bc) => bc.id === card.bankCardId);
  }

  const onCardClick = () => {
    navigate(`/card/${card?.id}`);
    return;
  };

  return (
    <S.StyledCardDiv onClick={onCardClick}>
      <CardImage cardName={bankCard?.name} />
      <Typography variant="body2" fontWeight="bolder">
        {card?.name}
      </Typography>
    </S.StyledCardDiv>
  );
};

Card.defaultProps = {
  card: undefined,
};

export default Card;
