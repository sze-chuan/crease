import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  getTransactionDialog,
  setTransactionDialog,
} from '../../slices/transaction';
import {
  getCards,
  getCardStatement,
  setCardStatement,
} from '../../slices/card';

import DialogTemplate from '../DialogTemplate';
import FormSelect from '../FormSelect';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as S from './styles';
import {
  CreateCardStatementClient,
  CreateCardStatementRequest,
  CreateTransactionClient,
  CreateTransactionRequest,
  GetCardStatementClient,
  QuickAddTransactionClient,
  QuickAddTransactionRequest,
  UpdateTransactionClient,
  UpdateTransactionRequest,
} from '../../api/apiClient';
import { useToast } from '../../contexts/toastContext';
import { TransactionDialogAction } from '../../types';
import { tokenUtils } from '../..';

interface AddTransactionFormData {
  cardId: string;
  description: string;
  date: Date;
  amount: number;
  transactionCategory: string;
  paymentType: PaymentType;
}

const TransactionCategories = {
  Shopping: 'Shopping',
  Groceries: 'Groceries',
  FoodDelivery: 'Food Delivery',
  Telco: 'Telco',
  OnlineTvStreaming: 'Online TV Streaming',
  Transport: 'Transport',
  Petrol: 'Petrol',
};
enum PaymentType {
  Physical = 'Physical',
  Contactless = 'Contactless',
  Online = 'Online',
}

const schema = yup
  .object({
    date: yup
      .date()
      .label('Transaction Date')
      .required()
      .typeError('Invalid approval date'),
  })
  .required();

const AddTransactionDialog = (): JSX.Element => {
  const dispatch = useDispatch();
  const { setToast } = useToast();
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddTransactionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
      paymentType: PaymentType.Physical,
      transactionCategory: '',
      cardId: '',
    },
  });

  const cards = useSelector(getCards);
  const transactionDialog = useSelector(getTransactionDialog);
  const cardStatement = useSelector(getCardStatement);

  const paymentTypes = Object.keys(PaymentType).filter((paymentType) =>
    isNaN(Number(paymentType))
  );

  const dialogTitle =
    transactionDialog.action === TransactionDialogAction.Update
      ? 'Update Transaction'
      : 'Add Transaction';
  const submitButtonText =
    transactionDialog.action === TransactionDialogAction.Update
      ? 'Update'
      : 'Add';

  if (transactionDialog.card) {
    setValue('cardId', transactionDialog.card.id ?? '');
  } else if (transactionDialog.transaction) {
    for (const [name, value] of Object.entries(transactionDialog.transaction)) {
      setValue(name as keyof AddTransactionFormData, value);
    }
  }

  const updateCardStatement = async (cardStatementId: string) => {
    const getCardStatementClient = new GetCardStatementClient(
      tokenUtils,
      process.env.REACT_APP_API_URL
    );
    const result = await getCardStatementClient.get(cardStatementId);

    dispatch(setCardStatement(result));
  };

  const handleClose = () => {
    dispatch(setTransactionDialog({ visible: false }));
    reset();
  };

  const onSubmit = async (data: AddTransactionFormData) => {
    const transactionClient = new CreateTransactionClient(
      tokenUtils,
      process.env.REACT_APP_API_URL
    );

    try {
      if (transactionDialog.action === TransactionDialogAction.AddFromCard) {
        let cardStatementId;

        if (!transactionDialog.cardStatement?.id) {
          const createCardStatementClient = new CreateCardStatementClient(
            tokenUtils,
            process.env.REACT_APP_API_URL
          );

          cardStatementId = await createCardStatementClient.create({
            monthYear: transactionDialog.cardStatement?.monthYear,
            cardId: transactionDialog.card?.id,
            bankCardId: transactionDialog.card?.bankCardId,
          } as CreateCardStatementRequest);
        } else {
          cardStatementId = transactionDialog.cardStatement.id;
        }

        await transactionClient.create(cardStatementId, {
          date: data.date,
          amount: data.amount,
          description: data.description,
          paymentType: data.paymentType,
          transactionCategory: data.transactionCategory,
        } as CreateTransactionRequest);

        await updateCardStatement(cardStatementId);
      } else if (
        transactionDialog.action === TransactionDialogAction.AddFromHome
      ) {
        const createTransactionClient = new QuickAddTransactionClient(
          tokenUtils,
          process.env.REACT_APP_API_URL
        );

        await createTransactionClient.create({
          cardId: data.cardId,
          date: data.date,
          amount: data.amount,
          description: data.description,
          paymentType: data.paymentType,
          transactionCategory: data.transactionCategory,
        } as QuickAddTransactionRequest);
      } else {
        if (transactionDialog.transaction?.id && cardStatement?.id) {
          const updateTransactionClient = new UpdateTransactionClient(
            tokenUtils,
            process.env.REACT_APP_API_URL
          );

          await updateTransactionClient.create(
            transactionDialog.transaction?.id,
            {
              cardStatementId: cardStatement?.id,
              date: data.date,
              amount: data.amount,
              description: data.description,
              paymentType: data.paymentType,
              transactionCategory: data.transactionCategory,
            } as UpdateTransactionRequest
          );

          await updateCardStatement(cardStatement?.id);
        }
      }

      handleClose();
      setToast('Transaction added succesfully.', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogTemplate
      isDialogVisible={transactionDialog.visible}
      onClose={handleClose}
      dialogTitle={dialogTitle}
    >
      <form
        autoComplete="off"
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        {transactionDialog.action !== TransactionDialogAction.Update && (
          <FormSelect
            name="cardId"
            control={control}
            labelText="Card"
            isDisabled={transactionDialog.card != null}
          >
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.name}
              </MenuItem>
            ))}
          </FormSelect>
        )}
        <S.StyledFormControl fullWidth>
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Transaction Date"
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={errors.date ? true : false}
                    helperText={errors.date?.message ?? ''}
                  />
                )}
              />
            )}
          />
        </S.StyledFormControl>
        <S.StyledFormControl fullWidth>
          <TextField
            required
            label="Amount"
            variant="outlined"
            {...register('amount')}
            error={errors.amount ? true : false}
            helperText={errors.amount?.message ?? ''}
          />
        </S.StyledFormControl>
        <S.StyledFormControl fullWidth>
          <TextField
            required
            label="Description"
            variant="outlined"
            {...register('description')}
            error={errors.description ? true : false}
            helperText={errors.description?.message ?? ''}
          />
        </S.StyledFormControl>
        <FormSelect
          name="transactionCategory"
          control={control}
          labelText="Category"
        >
          {Object.entries(TransactionCategories).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </FormSelect>
        <FormSelect
          name="paymentType"
          control={control}
          labelText="Payment Mode"
        >
          {paymentTypes.map((transactionType) => (
            <MenuItem key={transactionType} value={transactionType}>
              {transactionType}
            </MenuItem>
          ))}
        </FormSelect>
        <S.StyledFormControl fullWidth>
          <S.StyledSubmitButton
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length > 0}
          >
            {submitButtonText}
          </S.StyledSubmitButton>
        </S.StyledFormControl>
      </form>
    </DialogTemplate>
  );
};

export default AddTransactionDialog;
