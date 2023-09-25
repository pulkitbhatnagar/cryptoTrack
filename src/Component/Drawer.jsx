import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Button,
    Avatar,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Pages/Firebase';
import { numberToComma } from '../utils/numberToAmountConversion';
import { doc, setDoc } from '@firebase/firestore';

import { db } from '../Pages/Firebase';
export default function UserDrawer({ openDrawer, handleDrawer }) {
    const { user, setAlert, coins, watchList, symbol, setWatchList } =
        CryptoState();
    const [loading, setLoading] = useState(false);
    const[listToDisplay,setListToDisplay]=useState([])

    async function logout() {
        await signOut(auth);

        setWatchList([]);
        setAlert({
            open: true,
            severity: 'success',
            message: 'Logged Out Successfully!',
        });

        handleDrawer(false);
    }
 

    React.useEffect(()=>{
        setListToDisplay(coins.map((coin) => watchList.includes(coin.id)&&coin))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[watchList])


    async function removeFromTheCart(coin) {
        const coinRef = doc(db, 'watchlist', user?.uid);
        try {
            setLoading(true);
            await setDoc(
                coinRef,
                {
                    coins: watchList.filter((val) => val !== coin.id),
                },
                { merge: true }
            );
            setLoading(false);
            setAlert({
                open: true,
                severity: 'success',
                message: `${coin.name} Removed form the list`,
            });
        } catch (e) {
            setLoading(false);
            setAlert({
                open: true,
                severity: 'error',
                message: e.message,
            });
        }
    }

    const list = (anchor) => (
        <Grid>
            {loading ? (
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                        width: '300px',
                    }}
                >
                    <CircularProgress />
                    <Typography sx={{ mt: '10px' }}>Loading...</Typography>
                </Grid>
            ) : (
                <Box
                    sx={{
                        width: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 3,
                    }}
                    role="presentation"
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={user.email}
                            src={user.photoURL}
                            sx={{ width: 200, height: 200 }}
                        />
                        <Typography
                            variant="h4"
                            sx={{ wordBreak: 'break-all' }}
                        >
                            {user.email}
                        </Typography>
                        <Box
                            sx={{
                                minHeight: '500px',
                                backgroundColor: 'grey',
                                width: '100%',
                                overflowY: 'scroll',
                                maxHeight: '350px',
                                mt: '20px',
                                pb:0,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    p: 1,
                                    color: 'gold',
                                }}
                            >
                                Your Coins
                            </Typography>
                            
                            {listToDisplay.map((coin) => {
                                  
                                     return (
                                        coin&&(
                                        <Grid
                                            sx={{
                                                p: '10px',
                                                m: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                backgroundColor: '#e5f4e3',
                                                borderRadius: '30px',
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    color: 'white',
                                                    p: '6px 16px',
                                                }}
                                            >
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    style={{
                                                        height: '100px',
                                                        width: '100px',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                        'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <Grid
                                                    sx={{
                                                        fontSize: '24px',
                                                        color: 'black',
                                                    }}
                                                >
                                                    {coin.name}
                                                </Grid>
                                                <Grid
                                                    sx={{
                                                        fontSize: '24px',
                                                        color: 'black',
                                                    }}
                                                >
                                                    {symbol}{' '}
                                                    {numberToComma(
                                                        coin.current_price
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    color: 'black',
                                                    mt: '10px',
                                                    width: '100%',
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: '100%',
                                                        borderRadius: '30px',
                                                    }}
                                                    onClick={() =>
                                                        removeFromTheCart(coin)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                       
                                    ))           
                            })}
                          
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                color: 'black',
                                width: '100%',
                                mt: '30px',
                                borderRadius: '10px',
                            }}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Box>
            )}
        </Grid>
    );

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={openDrawer}
                onClose={() => handleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}
