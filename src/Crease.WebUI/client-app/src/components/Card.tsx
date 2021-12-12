import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { ICardDto } from '../web-api-client';
import { getBankCards, setIsAddCardDialogVisible } from '../slices/cardSlice';

export interface CardProps {
  card: ICardDto | undefined;
}

export const Card = ({ card }: CardProps): JSX.Element => {
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
          `../resources/cards/${replaceBankCardName(bankCard.name)}.png`
        ).then((image) => {
          setCardImage(image.default);
        });
      }
    }
  }, []);

  return (
    <div
      className={`card ${card ? 'bank-card' : 'add-card'}`}
      onClick={onCardClick}
    >
      {card ? (
        <img src={`${cardImage}`} />
      ) : (
        <React.Fragment>
          <AddIcon className="add-icon" sx={{ color: 'primary.main' }} />
          <Typography variant="body1" sx={{ color: 'primary.main' }}>
            ADD A CARD
          </Typography>
        </React.Fragment>
      )}
    </div>
  );
};

Card.defaultProps = {
  card: undefined,
};

export default Card;
