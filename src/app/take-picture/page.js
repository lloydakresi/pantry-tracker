'use client'
import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CameraPage = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const takePicture = () => {
    if (camera.current) {
      const capturedImage = camera.current.takePhoto();
      setImage(capturedImage);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Camera
      </Typography>
      <Box sx={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
        <Camera ref={camera} aspectRatio={4 / 3} />
        <Button
          variant="contained"
          color="primary"
          onClick={takePicture}
          sx={{ marginTop: 2 }}
        >
          Take Picture
        </Button>
      </Box>
      {image && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Captured Image:</Typography>
          <img src={image} alt="Captured" style={{ width: '100%' }} />
        </Box>
      )}
    </Box>
  );
};

export default CameraPage;
