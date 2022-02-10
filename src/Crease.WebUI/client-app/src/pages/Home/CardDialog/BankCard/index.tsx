import React from 'react';
import { Typography } from '@mui/material';
import CardImage from '../../../../components/CardImage';

import { IBankCardDto } from '../../../../api/web-api-client';

import * as S from './styles';

export interface BankCardProps {
  bankCard: IBankCardDto;
  onBankCardSelect: (bankCard: IBankCardDto) => void;
}

const BankCard = ({
  bankCard,
  onBankCardSelect,
}: BankCardProps): JSX.Element => {
  const onClick = () => {
    onBankCardSelect(bankCard);
  };

  return (
    <S.StyledBankCardDiv onClick={onClick}>
      <CardImage cardName={bankCard.name} />
      <Typography variant="subtitle2">{bankCard.name}</Typography>
    </S.StyledBankCardDiv>
  );
};

export default BankCard;
