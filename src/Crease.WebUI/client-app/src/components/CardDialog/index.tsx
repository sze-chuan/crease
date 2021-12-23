import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getBankCards,
  getIsAddCardDialogVisible,
  setIsAddCardDialogVisible,
} from '../../slices/cardSlice';

import Dialog from '@mui/material/Dialog';
import { DialogTitle, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

import CardImage from '../shared/CardImage';
import BankCardSelection from './BankCardSelection';
import * as S from './styles';
import { IBankCardDto } from '../../web-api-client';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<unknown, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CardDialog = (): JSX.Element => {
  const isDialogVisible = useSelector(getIsAddCardDialogVisible);
  const dispatch = useDispatch();
  const bankCards = useSelector(getBankCards);
  const [selectedBankCard, setSelectedBankCard] = useState<
    IBankCardDto | undefined
  >(undefined);

  const handleClose = () => {
    setSelectedBankCard(undefined);
    dispatch(setIsAddCardDialogVisible(false));
  };

  const onBankCardSelect = (bankCard: IBankCardDto) => {
    setSelectedBankCard(bankCard);
  };

  return (
    <Dialog
      fullScreen
      open={isDialogVisible}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {'Add New Card'}
        <S.StyledCloseBtn aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </S.StyledCloseBtn>
      </DialogTitle>
      <S.StyledDialogContent>
        {selectedBankCard ? (
          <FormControl fullWidth>
            <S.StyledCardImageDiv>
              <CardImage cardName={selectedBankCard.name} />
            </S.StyledCardImageDiv>
            <S.StyledTextField
              id="card-name"
              label="Card name"
              variant="outlined"
            />
            <S.StyledTextField
              id="card-number"
              label="Last 4 digits of card"
              variant="outlined"
            />
          </FormControl>
        ) : (
          <BankCardSelection
            bankCards={bankCards}
            onBankCardSelect={onBankCardSelect}
          />
        )}
      </S.StyledDialogContent>
    </Dialog>
  );
};

export default CardDialog;
