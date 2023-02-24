import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  getTransactionDialog,
  setTransactionDialog,
} from '../../slices/transaction';

import DialogTemplate from '../DialogTemplate';
import CardImage from '../CardImage';
import FormSelect from '../FormSelect';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as S from './styles';
import {
  CreateTransactionClient,
  CreateTransactionRequest,
} from '../../api/apiClient';
import { useToast } from '../../contexts/toastContext';
import { useAuth } from '../../auth/authContext';

interface AddTransactionFormData {
  cardId: string;
  description: string;
  transactionDate: Date;
  amount: number;
  category: string;
  transactionType: TransactionType;
}

const PaymentCategories = ['Shopping', 'Dining'];
enum TransactionType {
  Physical = 'Physical',
  Contactless = 'Contactless',
  Online = 'Online',
}

const schema = yup
  .object({
    transactionDate: yup
      .date()
      .label('Transaction Date')
      .required()
      .typeError('Invalid approval date'),
  })
  .required();

const AddTransactionDialog = (): JSX.Element => {
  const dispatch = useDispatch();
  const { acquireToken } = useAuth();
  const { setToast } = useToast();

  const transactionDialog = useSelector(getTransactionDialog);
  const transactionTypes = Object.keys(TransactionType).filter((paymentType) =>
    isNaN(Number(paymentType))
  );

  const handleClose = () => {
    dispatch(setTransactionDialog({ visible: false }));
    reset();
  };

  const onSubmit = async (data: AddTransactionFormData) => {
    const transactionClient = new CreateTransactionClient(
      process.env.REACT_APP_API_URL
    );
    const token = await acquireToken();
    transactionClient.setAuthToken(token);

    try {
      const result = await transactionClient.create('', {
        date: data.transactionDate,
        amount: data.amount,
        description: data.description,
      } as CreateTransactionRequest);

      handleClose();
      setToast('Transaction added succesfully.', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTransactionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionDate: new Date(),
      transactionType: TransactionType.Physical,
      category: '',
    },
  });

  return (
    <DialogTemplate
      isDialogVisible={transactionDialog.visible}
      onClose={handleClose}
      dialogTitle="Add transaction"
    >
      <form
        autoComplete="off"
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <CardImage cardName={transactionDialog.card?.name} />
            <S.StyledFormControl fullWidth>
              <Controller
                name="transactionDate"
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
                        error={errors.transactionDate ? true : false}
                        helperText={errors.transactionDate?.message ?? ''}
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
            <FormSelect name="category" control={control} labelText="Category">
              {PaymentCategories.map((category) => (
                <MenuItem key={category} value={category.toLowerCase()}>
                  {category}
                </MenuItem>
              ))}
            </FormSelect>
            <FormSelect
              name="transactionType"
              control={control}
              labelText="Transaction type"
            >
              {transactionTypes.map((transactionType) => (
                <MenuItem key={transactionType} value={transactionType}>
                  {transactionType}
                </MenuItem>
              ))}
            </FormSelect>
          </div>
          <div>
            <S.StyledFormControl fullWidth>
              <S.StyledSubmitButton
                type="submit"
                variant="contained"
                disabled={Object.keys(errors).length > 0}
              >
                Add
              </S.StyledSubmitButton>
            </S.StyledFormControl>
          </div>
        </div>
      </form>
    </DialogTemplate>
  );
};

export default AddTransactionDialog;
