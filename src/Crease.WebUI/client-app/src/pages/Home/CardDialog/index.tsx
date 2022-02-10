import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  addCard,
  getBankCards,
  getIsAddCardDialogVisible,
  setIsAddCardDialogVisible,
} from '../../../store/cards/cardSlice';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

import CardImage from '../../../components/CardImage';
import BankCardSelection from './BankCardSelection';
import * as S from './styles';
import {
  CardsClient,
  CreateCardCommand,
  IBankCardDto,
  ICardDto,
} from '../../../api/apiClient';

interface AddCardFormData {
  cardName: string;
  cardNumber: string;
  approvalDate: Date;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<unknown, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup
  .object({
    cardName: yup.string().label('Card name').required(),
    cardNumber: yup
      .string()
      .label('Card number')
      .required()
      .min(4)
      .max(4)
      .matches(/[0-9]{4}/, 'Invalid card number format'),
    approvalDate: yup
      .date()
      .label('Approval Date')
      .required()
      .typeError('Invalid approval date'),
  })
  .required();

const CardDialog = (): JSX.Element => {
  const isDialogVisible = useSelector(getIsAddCardDialogVisible);
  const dispatch = useDispatch();
  const bankCards = useSelector(getBankCards);
  const [selectedBankCard, setSelectedBankCard] = useState<
    IBankCardDto | undefined
  >(undefined);
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      approvalDate: new Date(),
    },
  });

  const onSubmit = async (data: AddCardFormData) => {
    const cardsClient = new CardsClient(process.env.PUBLIC_URL);
    try {
      const result = await cardsClient.create({
        name: data.cardName,
        cardNumber: data.cardNumber,
        startDate: data.approvalDate,
        bankCardId: selectedBankCard?.id,
      } as CreateCardCommand);
      dispatch(
        addCard({
          id: result,
          name: data.cardName,
          bankCardId: selectedBankCard?.id,
        } as ICardDto)
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setSelectedBankCard(undefined);
    dispatch(setIsAddCardDialogVisible(false));
    reset();
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate={true}
          >
            <S.StyledCardImageDiv>
              <CardImage cardName={selectedBankCard.name} />
            </S.StyledCardImageDiv>
            <FormControl fullWidth>
              <S.StyledTextField
                required
                variant="outlined"
                label="Card name"
                {...register('cardName', { required: true })}
                error={errors.cardName ? true : false}
                helperText={errors.cardName?.message ?? ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <S.StyledTextField
                required
                label="Last 4 digits of card"
                variant="outlined"
                {...register('cardNumber', {
                  required: true,
                  maxLength: 4,
                  minLength: 4,
                  pattern: /[0-9]{4}/,
                })}
                error={errors.cardNumber ? true : false}
                helperText={errors.cardNumber?.message ?? ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="approvalDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Approval Date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <S.StyledTextField
                        {...params}
                        required
                        error={errors.approvalDate ? true : false}
                        helperText={errors.approvalDate?.message ?? ''}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <S.StyledSubmitButton
                type="submit"
                variant="contained"
                disabled={Object.keys(errors).length > 0}
              >
                Done
              </S.StyledSubmitButton>
            </FormControl>
          </form>
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
