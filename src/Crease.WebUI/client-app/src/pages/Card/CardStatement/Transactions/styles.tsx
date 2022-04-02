import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)`
  padding-left: 0;
`;

const NoTransactionsCell = styled(TableCell)`
  border: 0;
  padding-top: 32px;
`;

export { StyledTableCell, NoTransactionsCell };
