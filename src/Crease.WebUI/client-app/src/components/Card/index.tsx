import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';

import { ICardDto } from '../../web-api-client';
import {
  getBankCards,
  setIsAddCardDialogVisible,
} from '../../slices/cardSlice';

import * as S from './styles';

export interface CardProps {
  card: ICardDto | undefined;
}

const Card = ({ card }: CardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [cardImage, setCardImage] = useState<string>('');
  const bankCards = useSelector(getBankCards);

  const replaceBankCardName = (bankCardName: string) =>
    bankCardName.toLowerCase().replaceAll(' ', '-');

  const onCardClick = () => {
    if (!card) {
      dispatch(setIsAddCardDialogVisible(true));
    }
  };

  useEffect(() => {
    if (card?.bankCardId) {
      const bankCard = bankCards.find(
        (bankCardData) => bankCardData.id === card.bankCardId
      );

      if (bankCard?.name) {
        import(
          `../../resources/cards/${replaceBankCardName(bankCard.name)}.png`
        ).then((image) => {
          setCardImage(image.default);
        });
      }
    }
  }, []);

  return (
    <S.StyledCardDiv $isBankCard={card != null} onClick={onCardClick}>
      {card ? (
        <S.StyledImage src={`${cardImage}`} />
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
