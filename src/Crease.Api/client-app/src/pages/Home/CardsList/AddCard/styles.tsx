import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import theme from '../../../../styles/theme';

const StyledOuterDiv = styled('div')`
  width: 48%;
`;

const StyledAddCardDiv = styled('div')`
  display: flex;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  aspect-ratio: 16 / 10;
  border: 2px solid #007fff;
`;

const StyledAddIcon = styled(AddIcon)`
  margin-right: 12px;
  color: ${theme.palette.primary.main};
`;

export { StyledOuterDiv, StyledAddCardDiv, StyledAddIcon };
