import React, { useState, createContext, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface ToastContextInterface {
  setToast: (message: string, type: AlertColor) => void;
}

interface ToastProviderInterface {
  children: React.ReactNode;
}

const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface
);

export const useToast = (): ToastContextInterface => useContext(ToastContext);

export const ToastProvider = ({
  children,
}: ToastProviderInterface): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertColor>('success');

  const setToast = (message: string, type: AlertColor) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={type} onClose={handleClose} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
