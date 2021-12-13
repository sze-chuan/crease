import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ToolBar from '@mui/material/Toolbar';

const LoginButton = styled(Button)({
  color: 'white',
  variant: 'abc',
});

const StyledToolBar = styled(ToolBar)({
  'background-color': 'black',
  flex: '0 1 auto',
});

export { LoginButton, StyledToolBar };
