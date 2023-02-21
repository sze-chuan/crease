import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ToolBar from '@mui/material/Toolbar';

const HeaderButton = styled(Button)({
  color: 'white',
});

const StyledToolBar = styled(ToolBar)({
  'background-color': 'black',
  flex: '0 1 auto',
});

export { HeaderButton, StyledToolBar };
