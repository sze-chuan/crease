import { DialogContent, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../styles/theme';

const StyledDialogContent = styled(DialogContent)`
  padding-top: 10px !important;
`;

const StyledCloseBtn = styled(IconButton)`
  float: right;
`;

const StyledCardImageDiv = styled('div')`
  margin-bottom: ${theme.spacing(1)};
`;

const StyledTextField = styled(TextField)`
  margin: ${theme.spacing(1)} 0;
`;

export {
  StyledDialogContent,
  StyledCloseBtn,
  StyledTextField,
  StyledCardImageDiv,
};
