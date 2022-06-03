import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import * as S from './styles';
import { setIsAddCardDialogVisible } from '../../../../slices/card';

const AddCard = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsAddCardDialogVisible(true));
  };

  return (
    <S.StyledOuterDiv>
      <S.StyledAddCardDiv onClick={handleClick}>
        <S.StyledAddIcon />
        <Typography variant="body2" sx={{ color: 'primary.main' }}>
          ADD A CARD
        </Typography>
      </S.StyledAddCardDiv>
    </S.StyledOuterDiv>
  );
};

export default AddCard;
