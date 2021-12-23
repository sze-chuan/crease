import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IBankCardDto } from '../../../web-api-client';

import * as S from './styles';

export interface BankCardProps {
  bankCard: IBankCardDto;
}

const BankCard = ({ bankCard }: BankCardProps): JSX.Element => {
  const [cardImage, setCardImage] = useState<string>('');

  const replaceBankCardName = (bankCardName: string) =>
    bankCardName.toLowerCase().replace(' ', '-');

  useEffect(() => {
    if (bankCard?.name) {
      import(
        `../../../resources/cards/${replaceBankCardName(bankCard.name)}.png`
      ).then((image) => {
        setCardImage(image.default);
      });
    }
  }, []);

  return (
    <S.StyledBankCardDiv>
      <S.StyledImage src={`${cardImage}`} />
      <Typography variant="subtitle2">{bankCard.name}</Typography>
    </S.StyledBankCardDiv>
  );
};

export default BankCard;
