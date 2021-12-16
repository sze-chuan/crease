import { styled } from '@mui/material/styles';
import landingImage from '../../resources/landing.jpg';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const StyledSection = styled('section')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0.5, 0.8), rgba(0, 0, 0.5, 0.5)),
    url(${landingImage});
  background-size: cover;
`;

const StyledGetStartedBtn = styled(Button)`
  margin-top: 24px;
  background-color: white;
  color: black;
  border: 1px solid white;

  &:hover {
    background-color: white;
    border: 1px solid white;
  }
`;

const StyledH1 = styled('h1')`
  color: white;
`;

const StyledTypography = styled(Typography)`
  color: white;
`;

export { StyledSection, StyledGetStartedBtn, StyledH1, StyledTypography };
