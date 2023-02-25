import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import * as S from './styles';

interface FormSelectProps {
  name: string;
  labelText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  children: React.ReactNode;
  isDisabled?: boolean;
}

const FormSelect = ({
  name = '',
  labelText = '',
  control,
  children,
  isDisabled,
}: FormSelectProps): JSX.Element => {
  const labelId = `${name}-label`;
  return (
    <S.StyledFormControl fullWidth disabled={isDisabled}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select labelId={labelId} label={labelText} {...field}>
            {children}
          </Select>
        )}
      />
    </S.StyledFormControl>
  );
};

export default FormSelect;
