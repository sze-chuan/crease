import React from 'react';
import { IBankCardDto, ICardDto } from '../../../api/apiClient';

import Typography from '@mui/material/Typography';
import CardImage from '../../../components/CardImage';
import * as S from './styles';

interface CardDetailsProps {
  card: ICardDto;
  bankCard: IBankCardDto;
}

const CardDetails = ({ card, bankCard }: CardDetailsProps): JSX.Element => {
  return (
    <S.StyledCardDetailsDiv>
      <S.StyledCardDetailsItemDiv>
        <Typography variant="h5" paragraph={true} fontWeight="bold">
          {card.name}
        </Typography>
        <Typography variant="body1" paragraph={true}>
          {bankCard.name} by {bankCard.bank?.name}
        </Typography>
      </S.StyledCardDetailsItemDiv>
      <S.StyledCardDetailsItemDiv>
        <CardImage cardName={bankCard.name} />
      </S.StyledCardDetailsItemDiv>
    </S.StyledCardDetailsDiv>
  );
};

export default CardDetails;
