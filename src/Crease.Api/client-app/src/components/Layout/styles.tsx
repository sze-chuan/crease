import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)`
  padding: 0 !important;
  display: flex !important;
  flex-direction: column;
  height: 100vh !important;
`;

const StyledBox = styled(Box)`
  padding: 16px;
`;

export { StyledContainer, StyledBox };
