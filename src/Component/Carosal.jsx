import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../config/service';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { data } from '../mockData';
import { numberToComma } from '../utils/numberToAmountConversion';
import { Typography, Grid, CircularProgress } from '@mui/material';
const Carosal = () => {
    let { currency, symbol } = CryptoState();
    console.log(symbol);
    let [coinData, setCoinData] = useState([]);
    let [loading, setLoading] = useState(false);

    async function fetchCrypto() {
        try {
            setLoading(true);
            let cryptoData = await axios.get(TrendingCoins(currency));
            setCoinData(cryptoData?.data || data);
        } catch (e) {
            setCoinData(data);
        }
    }
    useEffect(() => {
        setLoading(false);
    }, [coinData]);

    useEffect(() => {
        fetchCrypto();
    }, []);

    const items = coinData.map((coin) => {
        return (
            <Link
                to={`/coins/${coin.id}`}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <Grid>
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        heigh="20px"
                        style={{ marginBottom: '10px', height: '80px' }}
                    />

                    <Typography variant="h6">
                        {coin.name}{' '}
                        <span
                            style={{
                                color:
                                    coin.price_change_percentage_24h > 0
                                        ? 'green'
                                        : 'red',
                            }}
                        >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: '20px',
                                sm: '32px',
                            },
                        }}
                    >
                        {symbol} {numberToComma(coin.current_price.toFixed(2))}
                    </Typography>
                </Grid>
            </Link>
        );
    });
    const responsive = {
        0: { items: 2 },
        512: { items: 3 },
    };
    return (
        <div>
            {loading ? (
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Grid>
            ) : (
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    autoPlay
                    responsive={responsive}
                    items={items}
                />
            )}
        </div>
    );
};

export default Carosal;
