import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import theme from '../../styles/theme';
import Button from '@mui/material/Button';

const StyledFormControl = styled(FormControl)`
  margin: ${theme.spacing(1)} 0;
`;

const StyledSubmitButton = styled(Button)`
  margin: ${theme.spacing(1)} 0;
`;

export { StyledFormControl, StyledSubmitButton };
