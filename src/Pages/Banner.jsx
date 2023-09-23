import React from 'react';
import { Container, Typography } from '@mui/material';
import Carosal from '../Component/Carosal';
const Banner = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(./banner2.jpg)',
            }}
        >
            <Container
                sx={{
                    height: '400px',
                    paddingTop: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    color: '#fccb06',
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: '24px',
                            sm: '40px',
                        },
                    }}
                >
                    Welcome To Crypto Tracker
                </Typography>
                <Typography
                    sx={{
                        display: 'flex',
                        fontSize: {
                            xs: '16px',
                            sm: '32px',
                        },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#fccb06',
                    }}
                >
                    Get all the Information Regarding Crypto at a button Click
                </Typography>
                <Carosal />
            </Container>
        </div>
    );
};

export default Banner;
