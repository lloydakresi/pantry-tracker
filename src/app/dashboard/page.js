'use client'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CameraCapture from '../../components/CameraCapture';
import FoodDialog from '../../components/FoodDialog';
import data from '../../test-data/pantry.json';

export default function Page() {
  const [food, setFood] = useState(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [newFood, setNewFood] = useState({ food: '', quantity: '', src: '' });

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleCameraOpen = () => setCameraOpen(true);
  const handleCameraClose = () => setCameraOpen(false);

  const handleChange = (event) => {
    setNewFood({ ...newFood, [event.target.name]: event.target.value });
  };

  const handleCapture = (photo) => {
    setNewFood({ ...newFood, src: photo });
    handleCameraClose();
  };

  const handleSubmit = () => {
    if (newFood.src || (newFood.food && newFood.quantity)) {
      setFood([...food, newFood]);
      setNewFood({ food: '', quantity: '', src: '' });
      handleDialogClose();
    } else {
      alert('Please enter food details or capture an image');
    }
  };

  return (
    <>
      <section className='flex flex-row w-full sm:w-2/6 items-center'>
        <Avatar alt='Remy Sharpe' src='/path/to/avatar/image.jpg' />
        <span className='block ml-2 text-xl font-bold'>Welcome, you!</span>
      </section>
      <section>
        <div className='px-20 mt-20'>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {food.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper style={{ padding: '8px', textAlign: 'center', backgroundColor: 'darkgrey' }}>
                  <Image src={item.src} height={100} width={100} alt={item.food} className="rounded" />
                  <Typography variant="h6" gutterBottom>
                    {item.food}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleDialogOpen}
        >
          <AddIcon />
        </Fab>
        <FoodDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          newFood={newFood}
          handleChange={handleChange}
          handleCameraOpen={handleCameraOpen}
        />
        <CameraCapture
          open={cameraOpen}
          onClose={handleCameraClose}
          onCapture={handleCapture}
        />
      </section>
    </>
  );
}
