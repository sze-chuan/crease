import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  addCard,
  getBankCards,
  getShowCardDialog,
  setShowCardDialog,
} from '../../../slices/card';

import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';

import CardImage from '../../../components/CardImage';
import DialogTemplate from '../../../components/DialogTemplate';
import BankCardSelection from './BankCardSelection';
import * as S from './styles';
import {
  CardsClient,
  CreateCardCommand,
  IBankCardDto,
  ICardDto,
} from '../../../api/apiClient';
import { useToast } from '../../../contexts/toastContext';
import { useAuth } from '../../../auth/authContext';

interface AddCardFormData {
  cardName: string;
  cardNumber: string;
  approvalDate: Date;
}

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
  const showCardDialog = useSelector(getShowCardDialog);
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
  const { acquireToken } = useAuth();
  const { setToast } = useToast();

  const onSubmit = async (data: AddCardFormData) => {
    const cardsClient = new CardsClient(process.env.REACT_APP_API_URL);
    const token = await acquireToken();
    cardsClient.setAuthToken(token);

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
      setToast('Card added succesfully.', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setSelectedBankCard(undefined);
    dispatch(setShowCardDialog(false));
    reset();
  };

  const onBankCardSelect = (bankCard: IBankCardDto) => {
    setSelectedBankCard(bankCard);
  };

  return (
    <DialogTemplate
      dialogTitle="Add new card"
      isDialogVisible={showCardDialog}
      onClose={handleClose}
    >
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
    </DialogTemplate>
  );
};

export default CardDialog;
