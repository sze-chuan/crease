import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Transactions = (): JSX.Element => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default Transactions;
