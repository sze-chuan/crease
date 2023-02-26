import React from 'react';
import { format } from 'date-fns';

import Typography from '@mui/material/Typography';
import Transactions from './Transactions';
import { CardStatementDiv, StatementMonthDiv } from './styles';
import { ICardStatementDto } from '../../../api/apiClient';

interface CardStatementProps {
  cardStatement?: ICardStatementDto;
}

const CardStatement = ({ cardStatement }: CardStatementProps): JSX.Element => {
  return cardStatement ? (
    <CardStatementDiv>
      <Typography variant="h5" fontWeight="bold">
        Transactions
      </Typography>
      <StatementMonthDiv>
        <Typography variant="body2" fontWeight="bold">
          {cardStatement.monthYear
            ? format(cardStatement.monthYear, 'MMM yyyy')
            : ''}
        </Typography>
      </StatementMonthDiv>
      {cardStatement.transactions ? (
        <Transactions transactions={cardStatement.transactions} />
      ) : (
        <React.Fragment />
      )}
    </CardStatementDiv>
  ) : (
    <React.Fragment />
  );
};

export default CardStatement;
