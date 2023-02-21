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
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';

import * as S from './styles';

interface AddTransactionFormData {
  cardId: string;
  transactionDate: Date;
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
  const transactionDialog = useSelector(getTransactionDialog);
  const handleClose = () => {
    dispatch(setTransactionDialog({ visible: false }));
  };
  const {
    reset,
    register,
    control,
    formState: { errors },
  } = useForm<AddTransactionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionDate: new Date(),
    },
  });

  return (
    <DialogTemplate
      isDialogVisible={transactionDialog.visible}
      onClose={handleClose}
      dialogTitle="Add transaction"
    >
      <form autoComplete="off" noValidate={true}>
        <div>
          <CardImage cardName={transactionDialog.card?.name} />
          <FormControl fullWidth>
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
                    <S.StyledTextField
                      {...params}
                      required
                      error={errors.transactionDate ? true : false}
                      helperText={errors.transactionDate?.message ?? ''}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
      </form>
    </DialogTemplate>
  );
};

export default AddTransactionDialog;
