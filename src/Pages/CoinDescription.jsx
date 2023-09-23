import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, Button } from '@mui/material';
import { numberToComma } from '../utils/numberToAmountConversion';
import ReactHtmlParser from 'react-html-parser';
import { doc, setDoc } from '@firebase/firestore';
import { CryptoState } from '../CryptoContext';
import { db } from '../Pages/Firebase';

const CoinDescription = ({
    data = {},
    currency,
    symbol,
    changeLoadingStateToTrue,
    changeLoadingStateToFalse,
}) => {
    const { user, setAlert, watchList } = CryptoState();
    const [present, setPresent] = useState(false);

    useEffect(() => {
        let list = watchList.filter((val) => val === data.id);
        if (list.length > 0) {
            setPresent(true);
        } else {
            setPresent(false);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchList]);

    async function addToWatchList() {
        const coinRef = doc(db, 'watchlist', user?.uid);
        try {
            changeLoadingStateToTrue();
            await setDoc(coinRef, {
                coins: watchList ? [...watchList, data.id] : [data.id],
            });
            setAlert({
                open: true,
                severity: 'success',
                message: `${data.name} added to the watchlist`,
            });
            setPresent(true);
            changeLoadingStateToFalse();
        } catch (e) {
            setAlert({
                open: true,
                severity: 'error',
                message: e.message,
            });
            changeLoadingStateToFalse();
        }
    }

    async function removeFromTheCart() {
        const coinRef = doc(db, 'watchlist', user?.uid);
        try {
            changeLoadingStateToTrue();
            await setDoc(
                coinRef,
                {
                    coins: watchList.filter((val) => val !== data.id),
                },
                { merge: true }
            );
            setAlert({
                open: true,
                severity: 'success',
                message: `${data.name} Removed form the list`,
            });
            setPresent(false);
            changeLoadingStateToFalse();
        } catch (e) {
            setAlert({
                open: true,
                severity: 'error',
                message: e.message,
            });
            changeLoadingStateToFalse();
        }
    }
    return (
        <Container>
            <Grid sx={{ m: '30px' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={data?.image?.large}
                        alt={data.name}
                        height={200}
                        style={{
                            marginBottom: '20px',
                            display: 'flex',
                            lignItems: 'center',
                        }}
                    />
                </Grid>
                <Typography
                    variant="h3"
                    style={{
                        textAlign: 'center',
                        color: '#fccb06',
                        marginBottom: '10px',
                    }}
                >
                    {data?.name}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        wordBreak: 'break-all',
                        marginBottom: '10px',
                    }}
                >
                    {ReactHtmlParser(data?.description?.en.split('. ')[0])}.
                </Typography>
                <Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography variant="h5" sx={{ mr: '5px' }}>
                            Rank:
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#fccb06' }}>
                            {data?.market_cap_rank}
                        </Typography>
                    </Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography variant="h5" sx={{ mr: ' 5px' }}>
                            Current Price:
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                wordBreak: 'break-word',
                                color: '#fccb06',
                            }}
                        >
                            {symbol}
                            {numberToComma(
                                data?.market_data?.current_price?.[
                                    currency.toLowerCase()
                                ]
                            )}
                        </Typography>
                    </Grid>
                    <Grid
                        style={{
                            display: 'flex',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography variant="h5" sx={{ mr: '3px' }}>
                            Market Cap:
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fccb06',
                                wordBreak: 'break-all',
                            }}
                        >
                            {symbol}
                            {numberToComma(
                                data.market_data?.market_cap?.[
                                    currency.toLowerCase()
                                ]
                            )}
                        </Typography>
                    </Grid>
                </Grid>
                {!present ? (
                    <Button
                        variant="contained"
                        sx={{ width: '100%', mt: '10px' }}
                        onClick={addToWatchList}
                    >
                        Add To Watchlist
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{ width: '100%', mt: '10px' }}
                        onClick={removeFromTheCart}
                    >
                        Remove from Watchlist
                    </Button>
                )}
            </Grid>
        </Container>
    );
};

export default CoinDescription;
