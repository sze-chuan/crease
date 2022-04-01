import React from 'react';

import Typography from '@mui/material/Typography';
import Transactions from './Transactions';
import { CardStatementDiv } from './styles';

const CardStatement = (): JSX.Element => {
  return (
    <CardStatementDiv>
      <Typography variant="h5" fontWeight="bold">
        Transactions
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        FEB 22
      </Typography>
      <Transactions></Transactions>
    </CardStatementDiv>
  );
};

export default CardStatement;
