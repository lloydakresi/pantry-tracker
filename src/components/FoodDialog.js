'use client'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function FoodDialog({ open, onClose, onSubmit, newFood, handleChange, handleCameraOpen }) {
  const [hasImage, setHasImage] = useState(false);

  const handleSubmit = () => {
    if (hasImage || (newFood.food && newFood.quantity)) {
      onSubmit();
    } else {
      alert('Please enter food details or capture an image');
    }
  };

  const handleImageCapture = () => {
    setHasImage(true);
    handleCameraOpen();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Food</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Food Name"
          name="food"
          value={newFood.food}
          onChange={handleChange}
          disabled={hasImage}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={newFood.quantity}
          onChange={handleChange}
          disabled={hasImage}
        />
        <Button onClick={handleImageCapture} variant="contained" color="primary">
          Capture Image
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
