import React from 'react';
import { Typography } from '@mui/material';
import CardImage from '../../shared/CardImage';

import { IBankCardDto } from '../../../web-api-client';

import * as S from './styles';

export interface BankCardProps {
  bankCard: IBankCardDto;
}

const BankCard = ({ bankCard }: BankCardProps): JSX.Element => {
  return (
    <S.StyledBankCardDiv>
      <CardImage cardName={bankCard.name} />
      <Typography variant="subtitle2">{bankCard.name}</Typography>
    </S.StyledBankCardDiv>
  );
};

export default BankCard;
