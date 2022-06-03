import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import * as S from './styles';

import SlideTransition from '../../components/SlideTransition';

export interface DialogTemplateProps {
  isDialogVisible: boolean;
  dialogTitle: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DialogTemplate = ({
  isDialogVisible,
  dialogTitle,
  children,
  onClose,
}: DialogTemplateProps): JSX.Element => {
  return (
    <Dialog
      fullScreen
      open={isDialogVisible}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>
        {dialogTitle}
        <S.StyledCloseBtn aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.StyledCloseBtn>
      </DialogTitle>
      <S.StyledDialogContent>{children}</S.StyledDialogContent>
    </Dialog>
  );
};

export default DialogTemplate;
