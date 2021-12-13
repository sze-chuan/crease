import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import theme from '../../theme';

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledAddIcon = styled(AddIcon)`
  margin-right: 12px;
  color: ${theme.palette.primary.main};
`;

export { StyledDiv, StyledImage, StyledAddIcon };
