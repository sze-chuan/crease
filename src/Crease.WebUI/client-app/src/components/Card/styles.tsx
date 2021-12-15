import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import theme from '../../theme';

const StyledCardDiv = styled.div<{ $isBankCard: boolean }>`
  display: flex;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  cursor: pointer;
  background-size: ${(props) => (props.$isBankCard ? 'contain' : 'none')};
  aspect-ratio: ${(props) => (props.$isBankCard ? 'auto' : '16 / 10')};
  border: ${(props) => (props.$isBankCard ? 'auto' : '2px solid #007fff')};
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledAddIcon = styled(AddIcon)`
  margin-right: 12px;
  color: ${theme.palette.primary.main};
`;

export { StyledCardDiv, StyledImage, StyledAddIcon };
