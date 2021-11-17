import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { CardDto } from '../web-api-client';

export interface CardProps {
  card: CardDto | undefined;
}

export const Card = ({ card }: CardProps): JSX.Element => {
  const [cardImage, setCardImage] = useState<string>('');
  useEffect(() => {
    if (card) {
      import(`../resources/cards/frank.png`).then((image) => {
        setCardImage(image.default);
      });
    }
  });

  return (
    <div
      className={`card ${card ? 'bank-card' : 'add-card'}`}
      style={{ backgroundImage: `url(${cardImage})` }}
    >
      {!card && (
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

export default Card;
