import { DialogContent, IconButton, Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)`
  max-width: 480px;
  margin: 0 auto;
`;

const StyledDialogContent = styled(DialogContent)`
  padding-top: 10px !important;
`;

const StyledCloseBtn = styled(IconButton)`
  float: right;
`;

export { StyledDialogContent, StyledCloseBtn, StyledDialog };
