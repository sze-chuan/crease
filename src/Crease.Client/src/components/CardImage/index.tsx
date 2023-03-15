import React, { useState } from 'react';
import StyledCardImage from './styles';

export interface CardImageProps {
  cardName: string | undefined;
}

const CardImage = ({ cardName }: CardImageProps): JSX.Element => {
  const [cardImage, setCardImage] = useState<string>('');

  const replaceCardName = (name: string) =>
    name.toLowerCase().replaceAll(' ', '-');

  if (cardName) {
    import(`../../assets/cards/${replaceCardName(cardName)}.png`).then(
      (image) => setCardImage(image.default)
    );
  }

  return <StyledCardImage src={cardImage} />;
};

export default CardImage;
