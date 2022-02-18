import React from 'react';

import Typography from '@mui/material/Typography';
import { TransactionsDiv } from './styles';

const CardStatement = (): JSX.Element => {
  return (
    <TransactionsDiv>
      <Typography variant="h5" fontWeight="bold">
        Transactions
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        FEB 22
      </Typography>
    </TransactionsDiv>
  );
};

export default CardStatement;
