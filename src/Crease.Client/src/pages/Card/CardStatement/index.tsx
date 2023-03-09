import React, { useState } from 'react';
import { format } from 'date-fns';

import Typography from '@mui/material/Typography';
import Transactions from './Transactions';
import { CardStatementDiv, StatementMonthDiv } from './styles';
import { ICardStatementDto } from '../../../api/apiClient';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface CardStatementProps {
  cardStatement?: ICardStatementDto;
  fetchCardStatement: (statementMonthYear: Date) => Promise<void>;
}

const CardStatement = ({
  cardStatement,
  fetchCardStatement,
}: CardStatementProps): JSX.Element => {
  const [changeMonthOpen, setChangeMonthOpen] = useState(false);
  const setValue = (newValue?: Date | null) => {
    if (newValue) {
      fetchCardStatement(newValue);
    }
  };

  return cardStatement ? (
    <CardStatementDiv>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="bold">
            Transactions
          </Typography>
        </Grid>
        <Grid item textAlign={'right'} xs={6}>
          <Button variant="outlined" onClick={() => setChangeMonthOpen(true)}>
            Change Month
          </Button>
          <DatePicker
            open={changeMonthOpen}
            onClose={() => setChangeMonthOpen(false)}
            views={['year', 'month']}
            value={cardStatement.monthYear}
            closeOnSelect={true}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={({ inputRef, inputProps }) => (
              <input ref={inputRef} {...inputProps} hidden={true} />
            )}
          />
        </Grid>
      </Grid>
      <StatementMonthDiv>
        <Typography variant="body1" fontWeight="bold">
          {cardStatement.monthYear
            ? format(cardStatement.monthYear, 'MMM yyyy')
            : ''}
        </Typography>
      </StatementMonthDiv>
      <div style={{ margin: '10px 0' }}>
        <Typography variant="body2" fontWeight={'bold'}>
          Cashback: {cardStatement.statementReward?.cashback?.toFixed(2)}
        </Typography>
      </div>
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
