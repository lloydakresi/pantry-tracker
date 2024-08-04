'use client'
import { useRef } from 'react';
import { Camera } from 'react-camera-pro';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function CameraCapture({ open, onClose, onCapture }) {
  const cameraRef = useRef(null);

  const handleCapture = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      onCapture(photo);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Capture Food Image</DialogTitle>
      <DialogContent>
        <Camera ref={cameraRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleCapture} color="primary">Capture</Button>
      </DialogActions>
    </Dialog>
  );
}
