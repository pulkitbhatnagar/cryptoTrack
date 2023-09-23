import React, { useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Pages/Firebase';

const SignUp = ({ handleCloseModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const { setAlert } = CryptoState();

    async function handleSave() {
        if (password != confirm) {
            setAlert({
                open: true,
                severity: 'error',
                message: 'password is incorrect',
            });
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setAlert({
                open: true,
                severity: 'success',
                message: `User has been logged in successfully`,
            });
            handleCloseModal();
        } catch (e) {
            setAlert({
                open: true,
                severity: 'error',
                message: e.message,
            });
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
            <TextField
                id="outlined-basic"
                label="Enter email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, mt: 2 }}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Enter Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                sx={{ mb: 2 }}
                fullWidth
            />
            <Button
                variant="filled"
                sx={{ backgroundColor: '#EEBC1D', color: 'white' }}
                onClick={handleSave}
            >
                Sign UP
            </Button>
        </Box>
    );
};
export default SignUp;
