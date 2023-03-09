/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import format from 'date-fns/format';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import { ITransactionDto } from '../../../../api/apiClient';
import { StyledTableCell, NoTransactionsCell } from './styles';

interface Column {
  id: string;
  label: string;
  align?: 'right';
}

interface TransactionsProps {
  transactions: ITransactionDto[];
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date' },
  {
    id: 'description',
    label: 'Description',
  },
  { id: 'amount', label: 'Amount', align: 'right' },
];

// const transactions: ITransactionDto[] = [
//   { id: '1', description: 'test', date: new Date(), amount: 20 },
//   { id: '2', description: 'test2', date: new Date(), amount: 30 },
// ];

const Transactions = ({ transactions }: TransactionsProps): JSX.Element => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell key={column.id} align={column.align}>
              {column.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <StyledTableCell>
                {format(transaction.date!, 'dd/MM/yy')}
              </StyledTableCell>
              <StyledTableCell>{transaction.description}</StyledTableCell>
              <StyledTableCell align="right">
                {transaction.amount?.toFixed(2)}
              </StyledTableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <NoTransactionsCell colSpan={3} align="center">
              You have no transactions yet.
            </NoTransactionsCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Transactions;
