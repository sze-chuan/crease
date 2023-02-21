import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

const AddTransactionFab = styled(Fab)`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 360px;
`;

export { AddTransactionFab };
