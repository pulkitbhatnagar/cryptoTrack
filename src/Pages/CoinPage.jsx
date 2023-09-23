import React, { useEffect, useState } from 'react';
import CoinDescription from './CoinDescription';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/service';
import axios from 'axios';
import { Grid, CircularProgress, Typography } from '@mui/material';

import Coinchart from './Coinchart';
const CoinPage = () => {
    const [data, setData] = useState({});
    const [loading, setIsLoading] = useState(false);
    let coinName = useParams();

    let { currency, symbol } = CryptoState();

    async function coinDescription() {
        setIsLoading(true);
        let coinData = await axios.get(SingleCoin(coinName?.id));
        setData(coinData);
    }

    function changeLoadingStateToTrue() {
        setIsLoading(true);
    }

    function changeLoadingStateToFalse() {
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    useEffect(() => {
        coinDescription();
    }, []);

    return (
        <Grid>
            {loading ? (
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                    }}
                >
                    <CircularProgress />
                    <Typography sx={{ mt: '10px' }}>Loading...</Typography>
                </Grid>
            ) : (
                <Grid
                    sx={{
                        display: 'flex',
                        mt: '10px',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                    }}
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            width: {
                                xs: '100%',
                                md: '30%',
                            },
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <CoinDescription
                            data={data.data}
                            currency={currency}
                            symbol={symbol}
                            changeLoadingStateToTrue={changeLoadingStateToTrue}
                            changeLoadingStateToFalse={
                                changeLoadingStateToFalse
                            }
                        />
                    </Grid>
                    <Grid
                        sx={{
                            backgroundColor: 'white',
                            width: '2px',
                        }}
                    ></Grid>
                    <Grid
                        sx={{
                            margin: '20px',
                            width: {
                                xs: '100%',
                                md: '75%',
                            },
                        }}
                    >
                        <Coinchart id={coinName?.id} />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default CoinPage;
