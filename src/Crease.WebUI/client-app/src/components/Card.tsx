import React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export const Card: React.FC = () => {
  return (
    <div className="add-card">
      <AddIcon className="add-icon" sx={{ color: 'primary.main' }} />
      <Typography variant="body1" sx={{ color: 'primary.main' }}>
        ADD A CARD
      </Typography>
    </div>
  );
};

export default Card;
