import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Pages/Firebase';

const Login = ({ handleCloseModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAlert } = CryptoState();
    async function loginHandle() {
        if (email === '' || password === '') {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Password or Email is incorrect',
            });
            return;
        }
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setAlert({
                open: true,
                severity: 'success',
                message: 'Logged In successfully',
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
            <Button
                variant="filled"
                sx={{ backgroundColor: '#EEBC1D', color: 'white' }}
                onClick={loginHandle}
            >
                Login
            </Button>
        </Box>
    );
};

export default Login;
