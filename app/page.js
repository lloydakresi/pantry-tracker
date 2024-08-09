'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore, storage } from './firebase/firebase-config'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Camera } from 'react-camera-pro'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,  // Set the desired width
  height: 'auto',  // Use 'auto' for dynamic height based on content, or set a specific value like '400px'
  maxHeight: '90vh',  // Optional: Set max height to prevent it from being too tall
  overflowY: 'auto',  // Optional: Add scrolling if content exceeds height
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [image, setImage] = useState(null)
  const [showCamera, setShowCamera] = useState(false) // Track camera visibility
  const [isUpdating, setIsUpdating] = useState(false) // Track if updating an item
  const camera = useRef(null)

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item, quantity, imageUrl) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const existingQuantity = docSnap.data().quantity
      await setDoc(docRef, { quantity: existingQuantity + quantity, imageUrl })
    } else {
      await setDoc(docRef, { quantity, imageUrl })
    }
    await updateInventory()
  }

  const updateItem = async (item, quantity, imageUrl) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    await setDoc(docRef, { quantity, imageUrl }, { merge: true })
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => {
    setOpen(true)
    setIsUpdating(false)
  }

  const handleClose = () => {
    setOpen(false)
    setItemName('')
    setQuantity('')
    setImage(null)
    setShowCamera(false) // Reset camera visibility
  }

  const handleUpdateOpen = (item) => {
    setItemName(item.name)
    setQuantity(item.quantity)
    setImage(item.imageUrl || null)
    setIsUpdating(true)
    setOpen(true)
  }

  const takePicture = () => {
    if (camera.current) {
      const imageSrc = camera.current.takePhoto()
      setImage(imageSrc)
      setShowCamera(false) // Hide the camera after taking the picture
    }
  }

  const handleAddOrUpdateItem = async () => {
    if (!itemName.trim() || isNaN(quantity) || quantity === '') {
      alert("Item name and a valid quantity are required");
      return;
    }

    let parsedQuantity = parseInt(quantity, 10);

    if (image && !image.startsWith('https://')) {
      const imageRef = ref(storage, `images/${itemName}.jpg`);
      const response = await fetch(image);
      const blob = await response.blob();
      const uploadResult = await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      if (isUpdating) {
        await updateItem(itemName, parsedQuantity, imageUrl);
      } else {
        await addItem(itemName, parsedQuantity, imageUrl);
      }
    } else {
      if (isUpdating) {
        await updateItem(itemName, parsedQuantity, image);
      } else {
        await addItem(itemName, parsedQuantity, image);
      }
    }

    handleClose();
  }


  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isUpdating ? 'Update Item' : 'Add Item'}
          </Typography>
          <Stack width="100%" direction={'column'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              disabled={isUpdating} // Disable editing item name during update
            />
            <TextField
              id="outlined-basic-quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
            {showCamera ? (
              <>
                <Camera ref={camera} />
                <Button variant="outlined" onClick={takePicture}>
                  Capture Photo
                </Button>
              </>
            ) : (
              <Button
                  variant="outlined"
                  onClick={() => setShowCamera(true)}
                  disabled={
                    !itemName.trim() ||
                    !quantity.toString().trim() ||
                    isNaN(quantity)
                    }
              >
                 Take Picture
              </Button>

            )}
          </Stack>
          {image && <img src={image} alt="Item preview" width="100%" />}
          <Button
            variant="outlined"
            onClick={handleAddOrUpdateItem}
            disabled={
              !itemName.trim() ||
              !quantity.toString().trim() ||
              isNaN(quantity)
            }
          >
            {isUpdating ? 'Update' : 'Add'}
          </Button>

        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({ name, quantity, imageUrl }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              {imageUrl && (
                <img src={imageUrl} alt={name} width="100px" height="100px" />
              )}
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
              <Button variant="contained" onClick={() => handleUpdateOpen({ name, quantity, imageUrl })}>
                Update
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
