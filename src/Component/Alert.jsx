import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { CryptoState } from '../CryptoContext';
const AlertShow = () => {
    let { alert, setAlert } = CryptoState();

    function handleClose() {
        setAlert({
            open: false,
            severity: alert.severity,
            message: '',
        });
    }
  
    return (
        <div>
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <Alert
                    onClose={alert.handleClose}
                    severity={alert.severity}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AlertShow;
