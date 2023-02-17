import React, { useState } from 'react';
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import BankCard from '../BankCard';

import { IBankCardDto } from '../../../../api/apiClient';

import * as S from './styles';

export interface BankCardSelectionProps {
  bankCards: IBankCardDto[];
  onBankCardSelect: (bankCard: IBankCardDto) => void;
}

const BankCardSelection = ({
  bankCards,
  onBankCardSelect,
}: BankCardSelectionProps): JSX.Element => {
  const [bank, setBank] = useState('');
  const [validBankCards, setValidBankCards] = useState<IBankCardDto[]>([]);

  const bankSelectItems = [
    ...Array.from(new Set(bankCards.map((bankCard) => bankCard.bank?.name))),
  ].map((bankName) => (
    <MenuItem key={bankName} value={bankName}>
      {bankName}
    </MenuItem>
  ));

  const validBankCardItems = validBankCards.map((bankCard) => (
    <BankCard
      key={bankCard.id}
      bankCard={bankCard}
      onBankCardSelect={onBankCardSelect}
    />
  ));

  const onBankSelect = (event: SelectChangeEvent) => {
    setBank(event.target.value);
    setValidBankCards(
      bankCards.filter((card) => card.bank?.name === event.target.value)
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="bank-label">Bank</InputLabel>
      <Select
        labelId="bank-label"
        id="bank-select"
        label="Bank"
        onChange={onBankSelect}
        value={bank}
      >
        {bankSelectItems}
      </Select>
      {bank ? (
        <S.SelectBankCardDiv>
          <Typography variant="h6">Select your card</Typography>
          <S.BankCardsDiv>{validBankCardItems}</S.BankCardsDiv>
        </S.SelectBankCardDiv>
      ) : null}
    </FormControl>
  );
};

export default BankCardSelection;
