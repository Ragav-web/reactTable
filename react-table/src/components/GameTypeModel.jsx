import React, { useState } from 'react';
import { Dialog, DialogTitle, ToggleButton, ToggleButtonGroup } from '@mui/material';

const GameTypeModal = ({ open, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
    onSelect(newOption); // Notify parent component of the selected option
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Select Game Type</DialogTitle>
      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={handleOptionChange}
        aria-label="game type"
        style={{ margin: 'auto', marginBottom: '20px' }}
      >
        <ToggleButton value="4" style={{ backgroundColor: selectedOption === "4" ? 'green' : 'white', color: 'black' }}>
          4 letters
        </ToggleButton>
        <ToggleButton value="5" style={{ backgroundColor: selectedOption === "5" ? 'green' : 'white', color: 'black' }}>
          5 letters
        </ToggleButton>
        <ToggleButton value="6" style={{ backgroundColor: selectedOption === "6" ? 'green' : 'white', color: 'black' }}>
          6 letters
        </ToggleButton>
      </ToggleButtonGroup>
    </Dialog>
  );
};

export default GameTypeModal;