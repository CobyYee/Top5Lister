import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import GlobalStoreContext from '../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  let open = false;
  let component = 
    <div>
        <Modal
            open={open}
            onClose={hideError}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Alert severity = "error">{auth.err}</Alert>
                <Button variant = "outlined" onClick = {hideError}> Okay! </Button>
            </Box>
        </Modal>
    </div>

  return (component);
}