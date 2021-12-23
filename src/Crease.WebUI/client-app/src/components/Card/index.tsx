import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';

import { IBankCardDto, ICardDto } from '../../web-api-client';
import {
  getBankCards,
  setIsAddCardDialogVisible,
} from '../../slices/cardSlice';

import CardImage from '../shared/CardImage';
import * as S from './styles';

export interface CardProps {
  card: ICardDto | undefined;
}

const Card = ({ card }: CardProps): JSX.Element => {
  const dispatch = useDispatch();
  const bankCards: IBankCardDto[] = useSelector(getBankCards);
  let bankCard: IBankCardDto | undefined;

  if (card) {
    bankCard = bankCards.find((bc) => bc.id === card.bankCardId);
  }

  const onCardClick = () => {
    if (!card) {
      dispatch(setIsAddCardDialogVisible(true));
    }
  };

  return (
    <S.StyledCardDiv $isBankCard={card != null} onClick={onCardClick}>
      {card ? (
        <CardImage cardName={bankCard?.name} />
      ) : (
        <React.Fragment>
          <S.StyledAddIcon />
          <Typography variant="body1" sx={{ color: 'primary.main' }}>
            ADD A CARD
          </Typography>
        </React.Fragment>
      )}
    </S.StyledCardDiv>
  );
};

Card.defaultProps = {
  card: undefined,
};

export default Card;
