import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { Grid, Avatar } from '@mui/material';
import UserDrawer from './Drawer';
const UserDetails = () => {
    const { user } = CryptoState();
    const [openDrawer, setOpenDrawer] = useState(false);
    function toggleDrawer() {
        setOpenDrawer(true);
    }
    return (
        <Grid>
            <Avatar
                alt="Remy Sharp"
                src={user?.photoURL}
                onClick={toggleDrawer}
            />
            <UserDrawer
                openDrawer={openDrawer}
                handleDrawer={setOpenDrawer}
            ></UserDrawer>
        </Grid>
    );
};

export default UserDetails;
