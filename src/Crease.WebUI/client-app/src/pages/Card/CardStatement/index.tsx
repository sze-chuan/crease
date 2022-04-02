import React from 'react';

import Typography from '@mui/material/Typography';
import Transactions from './Transactions';
import { CardStatementDiv, StatementMonthDiv } from './styles';

const CardStatement = (): JSX.Element => {
  return (
    <CardStatementDiv>
      <Typography variant="h5" fontWeight="bold">
        Transactions
      </Typography>
      <StatementMonthDiv>
        <Typography variant="body2" fontWeight="bold">
          FEB 22
        </Typography>
      </StatementMonthDiv>
      <Transactions></Transactions>
    </CardStatementDiv>
  );
};

export default CardStatement;
